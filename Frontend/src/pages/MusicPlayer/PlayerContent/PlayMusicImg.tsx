import React from "react";
import BaseProps from "components/common/BaseProps";
import { css } from "@emotion/react";

function PlayMusicImg(props: BaseProps) {
    return (
        <div
            className={`${props?.className}`}
            css={style}
        >
            <figure>
                <img src="" alt="PlayMusicImg" />
            </figure>
        </div>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default PlayMusicImg;