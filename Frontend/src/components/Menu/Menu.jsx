/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";   
import styled from "styled-components";
import ThemeContext from "../../store/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Login from "components/Login/Login";

const navStyle = css`
    width: 15vw;
    min-width: 15rem;
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
        width: 10rem;
        height: 3rem;
    }
`;
function Menu(props) {
    const ctx = useContext(ThemeContext);
    const { theme, setDarkTheme, setLightTheme } = ctx;
    const { background, fontColor } = ctx.themeStyle.menu;
    const { className, onMenuClose } = props;  
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
            dd
        </div>
    );
}

export default styled(Menu)`
    background-color: ${props => props.background};
    color: ${props => props.fontColor};
`;