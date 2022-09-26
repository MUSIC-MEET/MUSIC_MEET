import React, { useContext, useMemo } from "react";
import Llogo from "assets/Llogo.png";
import Dlogo from "assets/Dlogo.png";
import { css } from "@emotion/react";
import ThemeContext from "store/ThemeContext";
function Logo({ className }: { className?: string }) {
    const ctx = useContext(ThemeContext);
    const theme = ctx.theme;
    const logo = useMemo(() => theme === "dark" ? Dlogo : Llogo, [theme]);
    return (
        <article css={style} className={`${className} logo`}>
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
        
    }
`;
export default Logo;