import { css } from "@emotion/react";
import React from "react";
import BaseProps from "components/common/BaseProps";

function PlayerContent(props: BaseProps) {
    return (
        <section
            css={fullSizePlayerStyle}
            className={`fullsize-music-player ${props.className}`}>

        </section>
    );
}

const fullSizePlayerStyle = css`
    width: 100%;
    background: blue;
    transition: all 0.5s ease-in;
`;

export default PlayerContent;