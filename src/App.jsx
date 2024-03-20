import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Toaster } from 'sonner'
import Signup from './pages/auth/signup/Signup';
import Login from './pages/auth/login/Login';
import Navbar from './layout/navbar/Navbar';
import Profile from './pages/user/Profile/Profile';
import Header from './layout/header/Header';
import ForgotPassword from './pages/auth/forgot_password/ForgotPassword';
import ResetPassword from './pages/auth/reset-password/ResetPassword';
import Expense from './pages/user/Expenses/Expenses';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './utilities/redux-store/slices/modeSlice';
function App() {
    const darkMode = useSelector(selectDarkMode)
    const NavbarWrapper = () => {
        const { pathname } = useLocation();
        const publicPaths = ["/login", "/signup", "/forgot-password"];
        const resetPasswordRegex = /^\/reset-password\/[^/]+/;

        return !publicPaths.includes(pathname) && !resetPasswordRegex.test(pathname) && <Navbar />;
    };

    const HeaderWrapper = () => {
        const { pathname } = useLocation();
        const publicPaths = ["/login", "/signup", "/forgot-password"];
        const resetPasswordRegex = /^\/reset-password\/[^/]+/;

        return !publicPaths.includes(pathname) && !resetPasswordRegex.test(pathname) && <Header />;
    };

    return (
        <>
            <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
                <BrowserRouter >

                    <NavbarWrapper />
                    <HeaderWrapper />
                    <Routes>
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/reset-password/:token' element={<ResetPassword />} />
                        <Route path='/expenses' element={<Expense />} />
                        <Route path='/home' element={<Expense />} />
                        <Route path='/settings' element={<Profile />} />
                        <Route path="/" element={<Expense />} />
                    </Routes>
                </BrowserRouter>
                <Toaster position="bottom-right" expand={false} richColors duration={3000} />
            </div >


        </>
    );
}

export default App;
