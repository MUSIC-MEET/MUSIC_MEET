import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./Menu.module.css";
import styled from "styled-components";
import ThemeContext from "../../store/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NightsStayIcon from "@mui/icons-material/NightsStay";
const MenuNav = styled.nav`
    background: ${props => props.background};
    color: ${props => props.fontColor};
`;
function Menu(props) {
    const ctx = useContext(ThemeContext);
    const { theme, setDarkTheme, setLightTheme } = ctx;
    const { background, fontColor } = ctx.themeStyle.menu;
    const { className, onMenuClose } = props;
    return (
        <MenuNav background={background} fontColor={fontColor} className={`${className} ${classes.nav}`}>
            <CloseIcon 
                className={`${classes["menu-close"]} ${classes["nav-item"]}`}
                onClick={onMenuClose}
            />
            {
                theme === "dark" ?
                    <Brightness4Icon onClick={setLightTheme} />:
                    <NightsStayIcon onClick={setDarkTheme} />
            }
        </MenuNav>
    );
}

export default Menu;