/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";   
import ThemeContext from "../../store/ThemeContext";
import Login from "components/Login/Login";
import Search from "components/Search/Search";
import RoutesMenu from "components/RoutesMenu/RoutesMenu";
import TranslateIcon from "@mui/icons-material/Translate";
import SubMenu from "components/SubMenu/SubMenu";
import { useNavigate } from "react-router-dom";
const navStyle = css`
    min-width: 19rem;
    max-width: 60rem;
    height: 100vh;
    border-right: 2px solid #555555;
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
    const { background, fontColor } = ctx.themeStyle.menu;
    const { onMenuClose } = props;  
    const navigator = useNavigate();
    return (
        <div 
            css={[navStyle, css` background: ${background}; color: ${fontColor};`]}
        >
            <CloseIcon 
                onClick={onMenuClose}
            />
            
            <Login navigator={navigator}/>
            <Search />
            <RoutesMenu />
            <hr />
            <SubMenu />
            <TranslateIcon />
        </div>
    );
}
export default Menu;