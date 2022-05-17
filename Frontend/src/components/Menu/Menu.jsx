/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";   
import styled from "styled-components";
import ThemeContext from "../../store/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NightsStayIcon from "@mui/icons-material/NightsStay";

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
    & > :nth-child(1) {
        color: red;
        align-self: flex-end;
        margin: 1rem;
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
            <p className={"item"}>test</p>
        </div>
    );
}

export default styled(Menu)`
    background-color: ${props => props.background};
    color: ${props => props.fontColor};
`;