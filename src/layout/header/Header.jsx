import classes from './Header.module.css';
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleActions, selectDarkMode } from '../../utilities/redux-store/slices/modeSlice';
import PremiumButton from '../../components/premiumButton/PremiumButton';
import { userActions } from '../../utilities/redux-store/slices/userSlice';

const Header = () => {
    const darkMode = useSelector(selectDarkMode);
    const isPremiumEligible = useSelector(state => state.user.isPremiumEligible)
    const isPremium = useSelector(state => state.user.isPremium)
    const totalExpense = useSelector(state => state.user.totalExpense)
    const dispatch = useDispatch();

    const toggleModeHandler = () => {
        dispatch(toggleActions.toggleMode());
    };
    const buyPremiumHandler = () => {
        console.log('HI')
        if (totalExpense > 10000) {
            dispatch(userActions.updateToPremium())
        }
        else {
            alert("Complete expense of 100000")
        }
    }
    const currentDate = new Date().toLocaleDateString('en-US');
    return (
        <div className={classes["header-container"]}>
            <div className={classes["title-container"]}>
                <p>Hello User</p>
                <div className={classes["date-container"]}>
                    <MdOutlineKeyboardDoubleArrowRight className={classes["arrow-icon"]} />
                    <small>{currentDate}</small>
                </div>
            </div>
            <div className={classes["search-container"]}>
                <div >
                    {isPremium ? darkMode ? <MdOutlineLightMode className={classes["theme-toggle"]} onClick={toggleModeHandler} /> : <MdDarkMode className={classes["theme-toggle"]} onClick={toggleModeHandler} /> : ""}
                </div>
                <div>
                    {(isPremiumEligible && !isPremium) && <PremiumButton onClickHandler={buyPremiumHandler} />}
                </div>
                <div className={classes["search-bar"]}>
                    <input type="text" placeholder='Search Here' />
                    <FaSearch className={classes['search-icon']} />
                </div>

            </div>
        </div >
    );
}

export default Header;
