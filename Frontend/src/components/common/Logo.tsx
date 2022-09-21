import React, { useContext, useMemo } from "react";
import Llogo from "assets/Llogo.png";
import Dlogo from "assets/Dlogo.png";
import { css } from "@emotion/react";
import ThemeContext from "store/ThemeContext";
function Logo() {
    const ctx = useContext(ThemeContext);
    const theme = ctx.theme;
    const logo = useMemo(() => theme === "dark" ? Dlogo : Llogo, [theme]);
    return (
        <article css={style} className={`logo`}>
            <img src={logo} />
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
        margin-right: 2rem;
    }
`;
export default Logo;