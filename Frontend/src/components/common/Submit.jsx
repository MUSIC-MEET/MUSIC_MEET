import { css } from "@emotion/react";
import React, { useContext } from "react";
import ThemeContext from "store/ThemeContext";

function Submit(props) {
    const { w, h, value, disabled } = props;
    const ctx = useContext(ThemeContext);
    const { borderColor } = ctx.themeStyle.input;
    const { fontColor } = ctx.themeStyle.content;
    return (
        <input 
            type="submit" 
            value={value}
            disabled={disabled?  true: false}
            css={
                css`
                border: 1px solid ${borderColor}; 
                color: ${fontColor}; 
                width: ${w};
                height: ${h};
                background: none;
                cursor: pointer;
                &:disabled {
                    color: #b6b6b6;
                    cursor: not-allowed;
                }
                &:hover {
                    background: rgba(88, 88, 88, 0.1);
                }
                `
            }
        />
    );
}

export default React.memo(Submit);