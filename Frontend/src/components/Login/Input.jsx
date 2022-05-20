/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
function Input(props) {
    const { background , fontColor } = props;
    return (
        <input css={css`
            background: ${background};
            color: ${fontColor};
            `} 
        {...props.input} 
        />
    );
}

export default Input;