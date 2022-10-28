import React from "react";
import { css } from "@emotion/react";
import { Wrap } from "./Wrap";
import Title from "components/common/Title";
import Text from "components/common/Text";
import Modal from "components/UI/Modal";
import RedButton from "components/common/RedButton";
import GreenButton from "components/common/GreenButton";

interface ConfirmModalProps {
    title: string;
    content: string;
    confirmButtonText: string;
    cancelButtonText: string;
    onCancel: () => void;
    onClose: () => void;
    onConfirm: () => void;
}


/**
 * 
 * @param props obj
 * @param props.title string - modal title
 * @param props.content string - modal content
 * @param props.confirmButtonText string - confirm button text
 * @param props.cancelButtonText string - cancel button text
 * @param props.onCancel function - cancel button click event
 * @param props.onClose function - close button click event
 * @param props.onConfirm function - confirm button click event
 * @returns 
 */
function ConfirmModal(props: ConfirmModalProps) {
    const { title, content, confirmButtonText, cancelButtonText, onCancel, onClose, onConfirm } = props;
    return (
        <Modal css={css`min-height: 25rem;`} onClose={onClose}>
            <Wrap css={moreStyle}>
                <Title>{title}</Title>
                <Text>{content}</Text>
                <div className="button-wrap">
                    <RedButton
                        type="button"
                        value={confirmButtonText}
                        onClick={onConfirm}
                    />
                    <GreenButton
                        type="button"
                        value={cancelButtonText}
                        onClick={onCancel}
                    />
                </div>
            </Wrap>
        </Modal>
    );
}

const moreStyle = css`
    & > .button-wrap {
        position: absolute;
        bottom: 30px;
        margin-top: 1rem;
        & > input {
            font-size: 1.3rem;
            width:  8rem;
            height: 3rem;
            text-align: center;
            margin-right: 0.5rem;
        }
    }
    
`;

export default ConfirmModal;