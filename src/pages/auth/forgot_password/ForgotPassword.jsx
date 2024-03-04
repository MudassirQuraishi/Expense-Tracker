import { useRef, useState, } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom';

import Tooltip from '../../../components/tootltip/Tooltip'
import classes from './ForgotPassword.module.css';
// import { useUserContext } from '../../../utilities/customHooks/UserContextHook'



const ForgotPassword = () => {
    const navigate = useNavigate()
    const emailRef = useRef('');
    const [errors, setErrors] = useState({
        email: false,

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




    const clearForm = () => {
        emailRef.current.value = '';
    }
    const handleSubmit = async () => {
        if (errors.email || errors.password) {
            console.log('Please fill valid details')
            return;
        }
        try {
            const passwordResetData = {
                email: emailRef.current.value,
            }

            const response = await axios.post('http://localhost:8080/auth/reset-password', passwordResetData)

            if (response.status === 201) {
                toast.success('Password reset link sent successfully. Please check your mail');
                clearForm();
            }
        }
        catch (error) {
            console.error(error.message)
            switch (error.response.status) {
                case 400:
                    toast.error('Invalid credentials, please try again');
                    break;
                case 403:
                    toast.warn('Please verify your email before logging in')
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
                            <div className={classes["text-container"]}>
                                <h2>Forgot Password?</h2>
                                <p>Enter your email address to get the password reset link</p>
                            </div>
                            <div className={`${classes['form-control']} ${classes['tooltip-container']}`}>
                                <div className={`${classes['form-group']} ${errors.email && classes.error}`}>
                                    <label htmlFor="">Email</label>
                                    <input type="email" placeholder="Enter your email" ref={emailRef} onBlur={validateEmail} />
                                    {errors.email && <Tooltip message={tooltip.email} />}
                                </div>
                            </div>
                            <div className={`${classes['form-actions']} ${errors.final && classes.error}`} >
                                <button onClick={handleSubmit} disabled={errors.email || errors.password || errors.check}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={classes['toggle-links']}>
                    <Link to={'/login'}><span> Back to login</span></Link> </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
