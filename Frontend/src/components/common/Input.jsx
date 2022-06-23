/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useContext } from "react";
import ThemeContext from "store/ThemeContext";

function Input(props) {
    const ctx = useContext(ThemeContext);
    const { borderColor } = ctx.themeStyle.input;
    const { fontColor } = ctx.themeStyle.content;
    const { w, h } = props;
    return (
        <input className={props.className} css={[style,css`
            background: none;
            color: ${fontColor};
            border: 1px solid ${borderColor};
            width: ${w};
            height: ${h};
            `]} 
        {...props.input} 
        />
    );
}


const style = css`
    padding: 0.5rem;

    &:focus {
        border: none;
        border-bottom: 1px solid #FF5500;
    }
`;
export default Input;