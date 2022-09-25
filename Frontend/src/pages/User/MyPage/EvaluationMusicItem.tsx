import { css } from "@emotion/react";
import React from "react";

/**
 * 최근 평가한 음악 아이템
 * @returns 
 */
function EvaluationMusicItem() {
    return (
        <li css={style}>
            <figure>
                <img src="" alt="" />
            </figure>
            <div className="text-box">
                <div className="music-info info">

                </div>
                <div className="evalution-info info">

                </div>
            </div>
        </li>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    figure {
        width: 10rem; 
        height: 10rem;
        border: 1px solid black;
    }

    figure > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .text-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
`;

export default EvaluationMusicItem;