import styled from "@emotion/styled";
import React from "react";

interface RedButtonProps {
    value: string;
    type?: string;
    onClick?: () => void;
}

function RedButton(props: RedButtonProps) {
    const { value, onClick, type } = props;
    return (
        <RedButtonComponent type={type} value={value} onClick={onClick}>
        </RedButtonComponent>
    );
}

const RedButtonComponent = React.memo(styled.input`

/* CSS */
    appearance: none;
    backface-visibility: hidden;
    background-color: rgb(184, 71, 68);
    border-radius: 8px;
    border-style: none;
    box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    line-height: 1.5;
    outline: none;
    overflow: hidden;

    &:hover {
        background-color: rgb(157, 59, 56);
        opacity: 1;
        transform: translateY(0);
        transition-duration: .35s;
    }

    &:active {
        transform: translateY(2px);
        transition-duration: .35s;
    }

`);
export default React.memo(RedButton);