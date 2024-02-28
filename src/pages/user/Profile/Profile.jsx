import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import classes from './Profile.module.css';
import Resizer from 'react-image-file-resizer';

const Profile = () => {
    const token = localStorage.getItem('auth-token')
    const [activeLink, setActiveLink] = useState('Account');
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        username: '',
        phoneNumber: '',
    });

    const fullNameRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const phoneNumberRef = useRef();
    const imageRef = useRef();

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
                file,
                maxWidth,
                maxHeight,
                'JPEG',
                50,
                0,
                (uri) => {
                    resolve(uri);
                },
                'base64',
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });

    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const resizedImage = await resizeImage(file, 800, 600);
        imageRef.current = resizedImage;
    };
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/userData', { headers: { Authorization: token } });
                setUserData(response.data.userData);
                const { email, fullname, phoneNumber, username } = response.data.userData;
                emailRef.current.value = email;
                fullNameRef.current.value = fullname;
                phoneNumberRef.current.value = phoneNumber;
                usernameRef.current.value = username;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataFromServer();
    }, [token]);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = {
                fullname: fullNameRef.current.value,
                username: usernameRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                profilePhoto: imageRef.current,
                email: emailRef.current.value,
            };


            const response = await axios.post(
                'http://localhost:8080/api/update-profile',
                updatedUserData,
                {
                    headers: {
                        Authorization: token,

                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            <div className={classes.container}>
                <h2>Settings</h2>
                <div className={classes["outer-container"]}>
                    <div className={classes["header"]}>
                        <ul className={classes["menu-links"]}>
                            <li className={classes["menu-link"]} onClick={() => handleLinkClick('Account')} >Account <hr className={activeLink === 'Account' ? classes.active : ''} /></li>
                            <li className={classes["menu-link"]} onClick={() => handleLinkClick('Security')} >Security  <hr className={activeLink === 'Security' ? classes.active : ''} /></li>
                        </ul>
                    </div>
                    <div className={classes["inner-container"]}>
                        <div className={classes["left-container"]}>
                            <form onSubmit={onSubmitHandler}>
                                <div className={classes["input-group"]}>
                                    <label htmlFor="">Full name</label>
                                    <input type="text" name='full-name' ref={fullNameRef} defaultValue={userData.fullname || ''} />
                                </div>
                                <div className={classes["input-group"]}>
                                    <label htmlFor="">Email</label>
                                    <input type="email" disabled ref={emailRef} defaultValue={userData.email || ''} />
                                </div>
                                <div className={classes["input-group"]}>
                                    <label htmlFor="">User name</label>
                                    <input type="text" ref={usernameRef} defaultValue={userData.username || ''} />
                                </div>
                                <div className={classes["input-group"]}>
                                    <label htmlFor="">Phone Number</label>
                                    <input type="tel" ref={phoneNumberRef} defaultValue={userData.phoneNumber || ''} />
                                </div>
                                <div className={classes["input-group"]}>
                                    <label htmlFor="">Profile Picture</label>
                                    <input type="file" onChange={handleImageChange} ref={imageRef} />
                                </div>
                                <div className={classes["form-action"]}>
                                    <button type='submit'>Update Profile</button>
                                </div>
                            </form>
                        </div>
                        <div className="right-container"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
