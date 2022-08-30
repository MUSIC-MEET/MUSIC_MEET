import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import getCommentList from "utils/RequestApis/GenreBoard/getCommentList";
import Comment from "./Comment";
function CommentList() {
    const params = useParams<{ genre: string, num: string }>();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "1";
    // const { data } = useQuery(["commentList", genre, num], () => getCommentList({ genre, num }), {
    //     suspense: true,
    //     useErrorBoundary: true
    // });

    const DUMMY_DATA = [
        {
            commentNum: "1",
            comment: "첫번째 댓글",
            nickname: "첫번째 작성자",
            createdAt: "2020-01-01",
            upvote: "1",
            downvote: "2"
        },
    ];
    return (
        <ul>
            {DUMMY_DATA.map((comment, index) => (
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

export default CommentList;