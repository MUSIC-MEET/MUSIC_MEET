import { css } from "@emotion/react";
import React from "react";
import CommentList from "./CommentList";
import InputComment from "./InputComment";

function Comments() {
    return (
        <article css={style}>
            <InputComment />
            <CommentList />
        </article>
    );
}

const style = css`
    margin-top: 2rem;
    width: 100%;
    min-height: 10rem;
    position: relative;

`;

export default Comments;