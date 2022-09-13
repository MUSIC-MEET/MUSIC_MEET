import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { PostType } from "./PostList";
interface PostProps {
    style: string;
}

function Post(props: PostType & PostProps) {
    const { id, title, writer, time, view, vote, style } = useMemo(() => props, [props]);
    return (
        <div className={`wrap`} css={[_style, style]}>
            <span className="num">{id}</span>
            <span className="title">{title}</span>
            <span className="writer">{writer}</span>
            <span className="time">{time}</span>
            <span className="view">{view}</span>
            <span className="vote">{vote}</span>
        </ div >
    );
}

const _style = css`
            cursor: pointer;
            text-align: center;
            border-bottom: 0.2px solid #5b5b5b;
            &:hover {
                background: rgba(88, 88, 88, 0.1);
    }
            `;

export default Post;