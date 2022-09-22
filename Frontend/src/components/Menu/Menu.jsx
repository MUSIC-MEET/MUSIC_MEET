import React, { useContext } from "react";
import { css } from "@emotion/react";   
import ThemeContext from "../../store/ThemeContext";
import Login from "components/Login/Login";
import Search from "components/Search/Search";
import RoutesMenu from "components/RoutesMenu/RoutesMenu";
import { useNavigate } from "react-router-dom";
import TopIcons from "./TopIcons";
import Logo from "../common/Logo";

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
            <Logo />   
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
        min-height: auto;
    }
    
    .logo {
        width: 10rem; // 160px  
        height: 3rem; // 48px
        margin-right: 1rem;
    }
    
`;
export default React.memo(Menu);