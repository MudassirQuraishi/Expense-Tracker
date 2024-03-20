// eslint-disable-next-line react/prop-types
const DownloadButton = ({ onClickHandler }) => {

    return <>
        <button onClick={() => {
            onClickHandler();
        }}>Buy Premium</button>
    </>
}
export default DownloadButton;