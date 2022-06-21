/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import { css } from "@emotion/react";   
import ThemeContext from "../../store/ThemeContext";
import Login from "components/Login/Login";
import Search from "components/Search/Search";
import RoutesMenu from "components/RoutesMenu/RoutesMenu";
import { useNavigate } from "react-router-dom";

import TopIcons from "./TopIcons";

function Menu(props) {
    const ctx = useContext(ThemeContext);
    const { background, fontColor } = ctx.themeStyle.menu;
    const { onMenuClose } = props;  
    const navigator = useNavigate();
    return (
        <aside 
            css={[navStyle, css` background: ${background}; color: ${fontColor};`]}
        >
            <TopIcons onMenuClose={onMenuClose}/>
            <Login navigator={navigator}/>
            <Search />
            <RoutesMenu />
        </aside>
    );
}

const navStyle = css`
    width: 17.5rem;
    height: 100vh;
    border-right: 2px solid #555555;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 

    & > * {
        width: 11rem;
        height: auto;
    }
`;

export default Menu;