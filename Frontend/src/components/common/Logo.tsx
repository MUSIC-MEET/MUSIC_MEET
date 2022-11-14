import React, { useCallback, useContext, useEffect, useMemo } from "react";
import Llogo from "assets/Llogo.png";
import Dlogo from "assets/Dlogo.png";
import { css } from "@emotion/react";
import ThemeContext from "store/ThemeContext";
import BaseProps from "./BaseProps";
import { useNavigate } from "react-router-dom";
import CurrentPage from "store/CurrentPage";
import { useSetRecoilState } from "recoil";

/**
 * 로고 컴퍼넌트
 * @param props?.className
 * @param props?.onClick
 * @returns 
 */
function Logo(props: BaseProps) {
    const ctx = useContext(ThemeContext);
    const theme = ctx.theme;
    const logo = useMemo(() => theme === "dark" ? Dlogo : Llogo, [theme]);
    const navigator = useNavigate();
    const setCurrentPage = useSetRecoilState(CurrentPage);
    const logoClickHandler = useCallback(() => {
        setCurrentPage(0);
        navigator("/");
    }, [navigator, setCurrentPage]);
    return (
        <article
            css={style}
            className={`${props.className} logo`}
        >
            <img src={logo} onClick={logoClickHandler} />
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