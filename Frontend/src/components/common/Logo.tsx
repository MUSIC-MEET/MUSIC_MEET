import React from "react";
import logo2 from "assets/logo2.png";
import { css } from "@emotion/react";
function Logo() {
    return (
        <article css={style} className={`logo`}>
            <img src={logo2} />
        </article>

    );
}

const style = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
export default Logo;