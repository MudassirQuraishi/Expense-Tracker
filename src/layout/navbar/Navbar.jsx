import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'

import classes from './Navbar.module.css'
import { PiSquaresFour } from "react-icons/pi";
import { CiWallet } from "react-icons/ci";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GrMoney } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { RiSettings4Line } from "react-icons/ri";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import dummyImage from '../../assets/images/blank-profile-picture-973460_640.webp'
import { useUserContext } from '../../utilities/customHooks/UserContextHook';


const Navbar = () => {
    const [activeLink, setActiveLink] = useState('Overview');
    const { userDetails, removeToken } = useUserContext()
    const navigate = useNavigate();
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    const logoutHandler = () => {
        toast('Are you sure you want to log out', {
            action: {
                label: 'Logout',
                onClick: () => {
                    removeToken();
                    navigate('/login');
                }
            },
        })
    }
    return <>
        <div className={classes["navbar-container"]}>
            <div className={classes["logo-menu"]}>
                <div className={classes.logo}>
                    <p>KharchaPani.IO</p>
                </div>
                <ul className={classes["menu-links"]}>
                    <li className={`${classes['menu-link']} ${activeLink === 'Overview' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Overview')}>
                        <PiSquaresFour /><Link to={'/'} >Overview</Link>
                    </li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Balances' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Balances')}><CiWallet />Balances</li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Transactions' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Transactions')}><HiArrowsRightLeft />Transactions</li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Bills' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Bills')}><LiaFileInvoiceDollarSolid />Bills</li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Expenses' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Expenses')}><GrMoney /><Link to={'/expenses'}>Expenses</Link> </li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Goals' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Goals')}><GoGoal />Goals</li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Settings' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Settings')}><RiSettings4Line /> <Link to={'/settings'}>Settings</Link> </li>
                </ul>
            </div>
            <div className={classes["nav-footer"]}>
                <ul className={classes["logout-container"]}>
                    <li className={classes["logout-link"]} onClick={logoutHandler} ><IoIosLogOut />Logout</li>

                </ul>
                <div className={classes["profile-container"]}>
                    <div className={classes["name-image"]}>
                        <img src={userDetails.profilePhoto || dummyImage} alt="" />
                        <div className={classes.name}>
                            <h3>Name</h3>
                            <p>View Profile</p>
                        </div>
                    </div>
                    <PiDotsThreeOutlineVertical className={classes["dots-icon"]} />
                </div>

            </div>
        </div>
    </>
}
export default Navbar;