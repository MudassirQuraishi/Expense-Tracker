import { useRef, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'

import Tooltip from '../../../components/tootltip/Tooltip'
import classes from './Signup.module.css';


const Signup = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const checkRef = useRef('');
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        check: false,
    });
    const [tooltip, setTooltip] = useState({
        email: '',
        password: '',
        check: '',
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

    const checkPassword = (e) => {
        const isPasswordMatching = e.target.value === passwordRef.current.value;

        setErrors((prevData) => {
            return { ...prevData, check: !isPasswordMatching };
        });
        setTooltip((prevTooltip) => {
            return { ...prevTooltip, check: isPasswordMatching ? '' : 'Passwords do not match' };
        });
    };
    const passwordCriteria = errors.password ? <small>Alpha Numeric, one special character,Minimum length of 8 characters</small> : <small></small>

    const clearForm = () => {
        emailRef.current.value = '';
        passwordRef.current.value = '';
        checkRef.current.value = '';
    }
    const handleSubmit = async () => {
        if (errors.email || errors.password || errors.check) {
            console.log('Please fill valid details')
            return;
        }
        try {
            const signinData = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
            const response = await axios.post('http://localhost:8080/auth/signup', signinData)
            console.log(response)
            if (response.status === 201) {
                toast.success('Logged in successfully');
                clearForm();
            }
        }
        catch (error) {
            console.error(error.message)
            switch (error.response.status) {
                case 400:
                    toast.error('Invalid credentials, please try again');
                    break;
                case 409:
                    toast.warn('User already exists, continue to login');
                    clearForm();
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
                                <div className={`${classes['form-group']} ${errors.check && classes.error}`}>
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="text" placeholder="Re-enter your password" ref={checkRef} onBlur={checkPassword} />
                                    {errors.check && <Tooltip message={tooltip.check} />}
                                </div>
                            </div>
                            <div className={`${classes['form-actions']} ${errors.final && classes.error}`} >
                                <p>
                                    By continuing, you agree to our <span>terms of service</span>
                                </p>
                                <button onClick={handleSubmit} disabled={errors.email || errors.password || errors.check}>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={classes['toggle-links']}>
                    Already have an account? <span> Sign in here</span></p>
            </div>
        </div>
    );
};

export default Signup;
