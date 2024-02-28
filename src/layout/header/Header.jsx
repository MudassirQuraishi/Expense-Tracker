import classes from './Header.module.css'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
const Header = () => {
    return <>
        <div className={classes["header-container"]}>
            <div className={classes["title-container"]}>
                <p>Hello User</p>
                <div className={classes["date-container"]}>
                    <MdOutlineKeyboardDoubleArrowRight className={classes["arrow-icon"]} />
                    <small >25/09/2000</small>
                </div>
            </div>
            <div className={classes["search-container"]}>
                <IoIosNotifications className={classes['notification-icon']} />
                <div className={classes["search-bar"]}>
                    <input type="text" placeholder='Seacrh Here' />
                    <FaSearch className={classes['search-icon']} />
                </div>
            </div>
        </div>
    </>
}
export default Header;