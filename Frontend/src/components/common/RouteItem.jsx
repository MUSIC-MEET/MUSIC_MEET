import React from "react";
import { css } from "@emotion/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
const style = css`
    margin-bottom: 1rem;
    cursor: pointer;
    width: auto;
`;
function RouteItem(props) {
    const navigator = useNavigate();
    const { name, link, currentIndex, onClickRoute, clicked } = props;
    const navigaterHandler = useCallback(() => {
        navigator(link);
        onClickRoute(currentIndex);
    },[currentIndex, link, navigator, onClickRoute]);
    return (
        <li css={[style, 
            css`
            color: ${clicked ? "red" : ""}; 
            font-weight:  ${clicked ? "bold" : ""};
            `]} 
        onClick={navigaterHandler}
        >
            <span>{name}</span>
        </li>
    );
}

export default React.memo(RouteItem);