/* eslint-disable react/prop-types */
import classes from './Tooltip.module.css';

const Tooltip = ({ message }) => {
    const expectedMessages = ["Invalid email format", "Password requirements not met", "Passwords do not match"]
    const isValidMessage = expectedMessages.includes(message);
    return <div className={classes.tooltip} data-testid={"tooltip-test"}>{isValidMessage ? message : "Something went wrong"}</div>;
};

export default Tooltip;
