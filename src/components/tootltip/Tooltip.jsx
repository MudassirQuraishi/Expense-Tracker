/* eslint-disable react/prop-types */
import classes from './Tooltip.module.css';

const Tooltip = (props) => {
    return <div className={classes.tooltip}>{props.message}</div>;
};

export default Tooltip;
