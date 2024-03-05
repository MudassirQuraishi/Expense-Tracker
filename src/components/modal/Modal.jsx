/* eslint-disable react/prop-types */
import classes from "./Modal.module.css";
import ReactDom from "react-dom";
// eslint-disable-next-line no-unused-vars
const Backdrop = (props) => {
    return <div className={classes.backdrop}></div>;
};
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};
const Modal = (props) => {
    return (
        <>
            {ReactDom.createPortal(
                <Backdrop />,
                document.getElementById("overlay-root")
            )}
            {ReactDom.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                document.getElementById("overlay-root")
            )}
        </>
    );
};
export default Modal;