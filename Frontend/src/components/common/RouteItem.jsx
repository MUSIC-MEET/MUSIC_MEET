import React, { useContext, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import  ThemeContext  from "store/ThemeContext";
const style = css`
    margin-bottom: 1rem;
    cursor: pointer;
    @media screen and (max-width: 1023px){
        margin-bottom: 0;
        padding: 0.8rem;
        width: 100vw;
        text-align: center;
        &:hover {
            background: rgba(88, 88, 88, 0.1);
        }
    }
`;
function RouteItem(props) {
    const navigator = useNavigate();
    const ctx = useContext(ThemeContext);
    const color= useMemo(() => ctx.themeStyle.menu.clicked, [ctx]);
    const hoverColor = useMemo(() =>ctx.themeStyle.menu.hover, [ctx]);
    const { name, link, currentIndex, onClickRoute, clicked } = props;
    const navigaterHandler = useCallback(() => {
        navigator(link);
        onClickRoute(currentIndex);
    },[currentIndex, link, navigator, onClickRoute]);


    useEffect(() => {
        //
    },[]);

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
            {name}
        </li>
    );
}

export default React.memo(RouteItem);