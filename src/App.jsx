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

// import ExpenseForm from './components/expenseForm/ExpenseFrom';

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
                    <Route path='/expenses' element={<Expense />} />
                    <Route path='/settings' element={<Profile />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="bottom-right" expand={false} richColors duration={3000} />

        </>
    );
}

export default App;
