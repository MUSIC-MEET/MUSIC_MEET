import React, { useContext } from "react";
import { css } from "@emotion/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import  ThemeContext  from "store/ThemeContext";
const style = css`
    margin-bottom: 1rem;
    cursor: pointer;
    width: auto;
`;
function RouteItem(props) {
    const navigator = useNavigate();
    const ctx = useContext(ThemeContext);
    const color= ctx.themeStyle.menu.clicked;
    const hoverColor = ctx.themeStyle.menu.hover;
    const { name, link, currentIndex, onClickRoute, clicked } = props;
    const navigaterHandler = useCallback(() => {
        navigator(link);
        onClickRoute(currentIndex);
    },[currentIndex, link, navigator, onClickRoute]);
    return (
        <li css={[style, 
            css`
            color: ${clicked ? color : ""}; 
            font-weight:  ${clicked ? "bold" : ""};
            &:hover {
                color: ${hoverColor}
            }
            `]} 
        onClick={navigaterHandler}
        >
            <span>{name}</span>
        </li>
    );
}

export default React.memo(RouteItem);