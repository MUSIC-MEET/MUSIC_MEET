/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useContext } from "react";
import ThemeContext from "store/ThemeContext";

function Submit(props) {
    const { w, h, value } = props;
    const ctx = useContext(ThemeContext);
    const { borderColor } = ctx.themeStyle.input;
    const { fontColor } = ctx.themeStyle.content;
    return (
        <input 
            type="submit" 
            value={value}
            css={
                css`
                border: 1px solid ${borderColor}; 
                color: ${fontColor}; 
                width: ${w};
                height: ${h};
                background: none;
                cursor: pointer;
                `
            }
        />
    );
}

export default Submit;