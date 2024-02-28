import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Signup from './pages/auth/signup/Signup';
import Login from './pages/auth/login/Login';
import Navbar from './layout/navbar/Navbar';
import Profile from './pages/user/Profile/Profile';
import Header from './layout/header/Header';

function App() {
    const NavbarWrapper = () => {
        const { pathname } = useLocation();
        const publicPaths = ["/login", "/signup"];
        return !publicPaths.includes(pathname) && <Navbar />;
    };
    const HeaderWrapper = () => {
        const { pathname } = useLocation();
        const publicPaths = ["/login", "/signup"];
        return !publicPaths.includes(pathname) && <Header />;
    };

    return (
        <>
            <BrowserRouter>
                <NavbarWrapper />
                <HeaderWrapper />
                <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<Profile />} />
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
