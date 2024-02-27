import { useRef, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom';

import Tooltip from '../../../components/tootltip/Tooltip'
import classes from './Login.module.css';


const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const termsCheckboxRef = useRef(null);
    const [errors, setErrors] = useState({
        email: false,
        password: false,

    });
    const [tooltip, setTooltip] = useState({
        email: '',
        password: '',
    });
    const validateEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(e.target.value);

        setErrors((prevData) => {
            return { ...prevData, email: !isEmailValid };
        });
        setTooltip((prevTooltip) => {
            return { ...prevTooltip, email: isEmailValid ? '' : 'Invalid email format' };
        });
    };

    const validatePassword = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValidPassword = passwordRegex.test(e.target.value);

        setErrors((prevData) => {
            return { ...prevData, password: !isValidPassword };
        });
        setTooltip((prevTooltip) => {
            return { ...prevTooltip, password: isValidPassword ? '' : 'Password requirements not met' };
        });
    };

    const passwordCriteria = errors.password ? <small>Alpha Numeric, one special character,Minimum length of 8 characters</small> : <small></small>

    const clearForm = () => {
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }
    const handleSubmit = async () => {
        if (errors.email || errors.password || !termsCheckboxRef.current.checked) {
            console.log('Please fill valid details')
            return;
        }
        try {
            const signinData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                keepLoggedIn: termsCheckboxRef.current.value,
            }
            const response = await axios.post('http://localhost:8080/auth/login', signinData)
            console.log(response)
            if (response.status === 200) {
                toast.success('Login successful');
                clearForm();
                localStorage.setItem('auth-token', response.data.encryptedId)
                navigate('/');

            }
        }
        catch (error) {
            console.error(error.message)
            switch (error.response.status) {
                case 400:
                    toast.error('Invalid credentials, please try again');
                    break;
                case 404:
                    toast.warn('User not found, please signup first');
                    clearForm();
                    navigate('/signup')
                    break;
                case 500:
                    toast.error('Something went wrong, please try again');
                    break;
                default:
                    toast.error('Something went wrong, please try again');
                    break;
            }
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes['outer-container']}>
                <div className={classes['inner-container']}>
                    <div className={classes.title}>
                        <p>KharchaPani.IO</p>
                    </div>
                    <div className={classes['input-container']}>
                        <div className={classes['form-container']}>
                            <div className={`${classes['form-control']} ${classes['tooltip-container']}`}>
                                <div className={`${classes['form-group']} ${errors.email && classes.error}`}>
                                    <label htmlFor="">Email</label>
                                    <input type="email" placeholder="Enter your email" ref={emailRef} onBlur={validateEmail} />
                                    {errors.email && <Tooltip message={tooltip.email} />}
                                </div>
                                <div className={`${classes['form-group']} ${errors.password && classes.error}`}>
                                    <label htmlFor="">Password</label>
                                    <input type="password" placeholder="Enter your password" ref={passwordRef} onBlur={validatePassword} />
                                    {passwordCriteria}
                                    {errors.password && < Tooltip message={tooltip.password} />}
                                </div>
                            </div>
                            <div className={`${classes['form-actions']} ${errors.final && classes.error}`} >
                                <div>
                                    <input type="checkbox" name="terms-of-use" id="terms-of-use" ref={termsCheckboxRef} />
                                    <span>Keep me Logged in</span>
                                </div>

                                <button onClick={handleSubmit} disabled={errors.email || errors.password || errors.check}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={classes['toggle-links']}>
                    Dont have an account? <Link to={'/signup'}><span> Create an account</span></Link> </p>
            </div>
        </div>
    );
};

export default Login;
