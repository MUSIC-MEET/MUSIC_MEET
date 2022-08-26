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

function ConfirmModal(props: ConfirmModalProps) {
    const { title, content, confirmButtonText, cancelButtonText, onCancel, onClose, onConfirm } = props;
    return (
        <Modal css={css`min-height: 20rem;`} onClose={onClose}>
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