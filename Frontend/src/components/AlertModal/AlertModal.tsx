import { css } from "@emotion/react";
import styled from "@emotion/styled";
import RedButton from "components/common/RedButton";
import Title from "components/common/Title";
import Modal from "components/UI/Modal";
import Text from "components/common/Text";
import React from "react";
import { Wrap } from "./Wrap";

interface AlertModalProps {
    title: string;
    content: string;
    button: string;
    onClose: () => void;
    buttonClick?: () => void;
}

/**
 * 알림 모달
 * @param props 
 * @params props.title 제목
 * @params props.content 내용
 * @params props.button 버튼 텍스트
 * @params props.onClose 닫기 버튼 클릭시 실행되는 함수
 * @params props.buttonClick 버튼 클릭시 실행되는 함수
 * @returns 
 */
function AlertModal(props: AlertModalProps) {
    const { title, content, onClose, button, buttonClick } = props;
    return (
        <Modal css={css`min-height: 20rem;`} onClose={onClose}>
            <Wrap css={moreStyle}>
                <Title>{title}</Title>
                <Text>{content}</Text>
                <RedButton
                    value={button}
                    onClick={buttonClick}
                    type={"button"}
                />
            </Wrap>
        </Modal>
    );
}

const moreStyle = css`
    & > input {
        position: absolute;
        bottom : 30px;
        font-size: 1.3rem;
        width:  8rem;
        height: 3rem;
        text-align: center;
    }   
    
`;


export default AlertModal;