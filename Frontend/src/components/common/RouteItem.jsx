/** @jsxImportSource @emotion/react */
import React from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useCallback } from "react";
const style = css`
    margin-bottom: 1rem;
    cursor: pointer;
    width: auto;
`;
function RouteItem(props) {
    const { name, link } = props;
    const navigater = useNavigate();

    const navigaterHandler = useCallback(() => {
        navigater(link);
    },[link, navigater]);
    return (
        <li css={style} onClick={navigaterHandler}>
            <span>{name}</span>
        </li>
    );
}

export default React.memo(RouteItem);