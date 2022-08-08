import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { PostType } from "./PostList";
function Post(props: PostType) {
    const { id, title, writer, time, view, vote } = useMemo(() => props, [props]);
    return (
        <tr css={style}>
            <td className="num">{id}</td>
            <td className="title">{title}</td>
            <td className="writer">{writer}</td>
            <td className="time">{time}</td>
            <td className="view">{view}</td>
            <td className="vote">{vote}</td>
        </tr>
    );
}

const style = css`
    cursor: pointer;
    text-align: center;
    border-bottom: 0.2px solid #5b5b5b;
    
    & > td {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    &:hover {
        background: rgba(88, 88, 88, 0.1);
    }
`;

export default Post;