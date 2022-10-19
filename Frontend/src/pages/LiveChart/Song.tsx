import { css } from "@emotion/react";
import React from "react";
import { SongType } from "./ChartList";
function Song({ rank, title, singer, imgSrc }: SongType) {

    return (
        <tr css={songStyle}>
            <td className="img"><img src={imgSrc} alt="" /></td>
            <td className="rank">{rank}</td>
            <td className="title">{title}</td>
            <td className="singer">{singer}</td>
        </tr>
    );
}

const songStyle = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    &:hover { 
        background: rgba(88, 88, 88, 0.1);
    }
    & > td> img  {
        width: 3.375rem;
        height: 3.375rem;
        margin-right: 1.2rem;
    }

    & > .rank {
        width: 11px;
        margin-right: 3.15rem;
    }

    & > .title {
        min-width: 30rem;
        max-width: 30rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 8rem;
    }
`;

export default React.memo(Song);