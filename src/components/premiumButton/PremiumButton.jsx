// eslint-disable-next-line react/prop-types
const PremiumButton = ({ onClickHandler }) => {

    return <>
        <button onClick={() => {
            onClickHandler();
        }}>Buy Premium</button>
    </>
}
export default PremiumButton;