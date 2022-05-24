/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect } from "react";
import { css } from "@emotion/react";
import ThemeContext from "store/ThemeContext";

function Input(props) {
    useEffect(() => {

    },[]);
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
`;
export default Input;