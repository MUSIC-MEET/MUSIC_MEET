/** @jsxImportSource @emotion/react */
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
    const { name, link } = props;
    const navigaterHandler = useCallback(() => {
        navigator(link);
    },[link, navigator]);
    return (
        <li css={style} onClick={navigaterHandler}>
            <span>{name}</span>
        </li>
    );
}

export default React.memo(RouteItem);