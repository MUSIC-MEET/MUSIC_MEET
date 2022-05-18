/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";   
import ThemeContext from "../../store/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Login from "components/Login/Login";
import { useTranslation } from "react-i18next";
import Search from "components/Search/Search";

const navStyle = css`
    min-width: 19rem;
    max-width: 60rem;
    height: 100vh;
    border-right: 2px solid gainsboro;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 


    & > svg {
        color: red;
        align-self: flex-end;
        margin: 0.2rem;
    }

    & > :not(svg) {
        width: 15rem;
        height: auto;
    }
`;
function Menu(props) {
    const ctx = useContext(ThemeContext);
    const { theme, setDarkTheme, setLightTheme } = ctx;
    const { background, fontColor } = ctx.themeStyle.menu;
    const { className, onMenuClose } = props;  
    const { i18n, t } = useTranslation("menu");
    return (
        <div 
            css={[navStyle, css` background: ${background}; color: ${fontColor};`]}
        >
            <CloseIcon 
                onClick={onMenuClose}
            />
            {
                theme === "dark" ?
                    <Brightness4Icon onClick={setLightTheme} />:
                    <NightsStayIcon onClick={setDarkTheme} />
            }
            <Login />
            <Search />
            <button onClick={() => i18n.changeLanguage("kr")}>KR</button>
            <button onClick={() => i18n.changeLanguage("en")}>en</button>
            <ul>
                <li>{t("routes.menu1")}</li>
                <li>{t("routes.menu2")}</li>
                <li>{t("routes.menu3")}</li>
                <li>{t("routes.menu4")}</li>
            </ul>
            
        </div>
    );
}
export default Menu;