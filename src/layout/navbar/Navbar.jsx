import { useState } from 'react';
import { Link } from 'react-router-dom'
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


const Navbar = () => {
    const [activeLink, setActiveLink] = useState('Overview');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
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
                        }`} onClick={() => handleLinkClick('Expenses')}><GrMoney />Expenses</li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Goals' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Goals')}><GoGoal />Goals</li>
                    <li className={`${classes['menu-link']} ${activeLink === 'Settings' ? classes.active : ''
                        }`} onClick={() => handleLinkClick('Settings')}><RiSettings4Line /> <Link to={'/profile'}>Settings</Link> </li>
                </ul>
            </div>
            <div className={classes["nav-footer"]}>
                <ul className={classes["logout-container"]}>
                    <li className={classes["logout-link"]}><IoIosLogOut />Logout</li>

                </ul>
                <div className={classes["profile-container"]}>
                    <div className={classes["name-image"]}>
                        <img src={dummyImage} alt="" />
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