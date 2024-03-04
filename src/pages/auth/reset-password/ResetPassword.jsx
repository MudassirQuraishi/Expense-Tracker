import { useRef, useState, } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link, useParams } from 'react-router-dom';

import Tooltip from '../../../components/tootltip/Tooltip'
import classes from './ResetPassword.module.css';
// import { useUserContext } from '../../../utilities/customHooks/UserContextHook'



const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    console.log(token)

    const passwordRef = useRef('');
    const checkRef = useRef('');
    const [errors, setErrors] = useState({

        password: false,
        check: false,
    });
    const [tooltip, setTooltip] = useState({
        password: '',
        check: '',
    });


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

        passwordRef.current.value = '';
        checkRef.current.value = '';
    }
    const handleSubmit = async () => {
        if (errors.password || errors.check) {
            console.log('Please fill valid details')
            return;
        }
        try {
            const signinData = {
                newPassword: passwordRef.current.value
            }
            const response = await axios.post(`http://localhost:8080/auth/update-password/${token}`, signinData)
            console.log(response)
            if (response.status === 201) {
                toast.success('Signup successful');
                clearForm();
                navigate('/login');
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
                    navigate('/login');
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

                                <button onClick={handleSubmit} disabled={errors.email || errors.password || errors.check}>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={classes['toggle-links']}>
                    <Link to={'/login'} > <span>Back to login </span></Link></p>
            </div>
        </div>
    );
};

export default ResetPassword;
