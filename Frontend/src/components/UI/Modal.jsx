import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import { useContext } from "react";
import ThemeContext from "../../store/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";

const portalElement = document.getElementById("overlay");

const Backdrop = (props) => {
    return <div {...props} css={backropStyle}></div>;
};

const ModalOverlay = (props) => {
    const ctx = useContext(ThemeContext);
    const { background, fontColor } = ctx.themeStyle.modal;
    return(
        <div className={props.className} css={[modalOverlayStyle,css`background: ${background}; color: ${fontColor};`]}>
            <CloseIcon onClick={props.onClose} className={"closeIcon"}/>
            {props.children}
        </div>
    );
};

function Modal(props) {
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape") {
                props.onClose();
            }
        });
    },[props]);
    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>, portalElement)
            }
            {
                ReactDOM.createPortal(
                    <ModalOverlay className={props.className} onClose={props.onClose}>
                        {props.children}
                    </ModalOverlay>,
                    portalElement)
            }
            
        </React.Fragment>
    );
}

const backropStyle = css`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 99;
`;

const modalOverlayStyle = css`
    position: absolute;
    width: 80%;
    max-width: 55rem;
    top: 5vw;
    left:50%;
    transform:translateX(-50%);
    z-index: 100;
    border-radius: 5px;
    padding: 1rem;
    border: 1px solid gray;

    .closeIcon {
        position: absolute;
        right: 1rem;
        cursor: pointer;
    }
`;

export default Modal;
