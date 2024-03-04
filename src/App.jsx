import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Signup from './pages/auth/signup/Signup';
import Login from './pages/auth/login/Login';
import Navbar from './layout/navbar/Navbar';
import Profile from './pages/user/Profile/Profile';
import Header from './layout/header/Header';
import ForgotPassword from './pages/auth/forgot_password/ForgotPassword';
import ResetPassword from './pages/auth/reset-password/ResetPassword';

function App() {
    const NavbarWrapper = () => {
        const { pathname } = useLocation();
        const publicPaths = ["/login", "/signup", "/", "/forgot-password"];
        const resetPasswordRegex = /^\/reset-password\/[^/]+/;

        return !publicPaths.includes(pathname) && !resetPasswordRegex.test(pathname) && <Navbar />;
    };

    const HeaderWrapper = () => {
        const { pathname } = useLocation();
        const publicPaths = ["/login", "/signup", "/", "/forgot-password"];
        const resetPasswordRegex = /^\/reset-password\/[^/]+/;

        return !publicPaths.includes(pathname) && !resetPasswordRegex.test(pathname) && <Header />;
    };

    return (
        <>
            <BrowserRouter>
                <NavbarWrapper />
                <HeaderWrapper />
                <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />
                    <Route path='/settings' element={<Profile />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme='light'
            />
        </>
    );
}

export default App;
