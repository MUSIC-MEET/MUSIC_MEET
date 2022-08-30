import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import getCommentList from "utils/RequestApis/GenreBoard/getCommentList";
import Comment from "./Comment";
import { css } from "@emotion/react";
function CommentList() {
    const params = useParams<{ genre: string, num: string }>();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "1";

    const { data } = useQuery(["commentList", genre, num], () => getCommentList({ genre, num }), {
        suspense: true,
        useErrorBoundary: true
    });


    return (
        <ul css={style}>
            {data?.comments.map((comment, index) => (
                <Comment
                    key={index}
                    commentNum={comment.commentNum}
                    comment={comment.comment}
                    nickname={comment.nickname}
                    createdAt={comment.createdAt}
                    upvote={comment.upvote}
                    downvote={comment.downvote}
                />
            ))}
        </ul>
    );
}

const style = css`
    margin-top: 2rem;
`;

export default CommentList;