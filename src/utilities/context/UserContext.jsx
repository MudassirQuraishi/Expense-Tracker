import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const UserContext = createContext({
    token: '',
    userDetails: {},
    setToken: () => { },
    removeToken: () => { },
    updateUserData: () => { },
})

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        username: '',
        phoneNumber: '',
        profilePciture: '',
    });

    useEffect(() => {
        const authToken = localStorage.getItem('auth-token');
        setToken(authToken);
    }, []);

    useEffect(() => {
        const removeTokenTimeout = setTimeout(() => {
            removeTokenHandler();
        }, 60 * 60 * 1000);

        return () => clearTimeout(removeTokenTimeout);
    }, [token]);

    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                if (token) {
                    const response = await axios.get('http://localhost:8080/api/userData', { headers: { Authorization: token } });
                    setUserData(response.data.userData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataFromServer();
    }, [token]);

    const setTokenHandler = (token) => {
        if (token) {
            setToken(token);
            localStorage.setItem('auth-token', token);
        }
        else {
            const authToken = localStorage.getItem('auth-token');
            setToken(authToken)
        }
    }

    const removeTokenHandler = () => {
        setToken(null);
        if (localStorage.getItem('auth-token')) {
            localStorage.removeItem('auth-token');
        }
    }

    const updateUserHandler = async (userData) => {
        const response = await axios.post(
            'http://localhost:8080/api/update-profile',
            userData,
            {
                headers: {
                    Authorization: token,

                },
            }
        );
        console.log(response)
    }
    const contextValue = {
        token: token,
        userDetails: userData,
        setToken: setTokenHandler,
        removeToken: removeTokenHandler,
        updateUserData: updateUserHandler
    }
    return <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
}
