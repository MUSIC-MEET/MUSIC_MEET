import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import getCommentList from "utils/RequestApis/GenreBoard/getCommentList";
import Comment from "./Comment";
import { css } from "@emotion/react";
import voteComment from "utils/RequestApis/GenreBoard/voteComment";
import deleteComment from "utils/RequestApis/GenreBoard/deleteComment";
import editComment from "utils/RequestApis/GenreBoard/editComment";
function CommentList() {
    const params = useParams<{ genre: string, num: string }>();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "1";
    const queryClient = useQueryClient();

    const { data } = useQuery(["commentList", genre, num], () => getCommentList({ genre, num }), {
        suspense: true,
        useErrorBoundary: true
    });

    const { mutate: voteMutate } = useMutation(voteComment, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 204) {
                queryClient.invalidateQueries(["commentList", genre, num]);
            }
        }
    });

    const { mutate: deleteMutate } = useMutation(deleteComment, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 204) {
                queryClient.invalidateQueries(["commentList", genre, num]);
            }
        }
    });

    const { mutate: editMutate } = useMutation(editComment, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 204) {
                queryClient.invalidateQueries(["commentList", genre, num]);
            }
        }
    });

    const voteHandler = useCallback(({ commentNum, type }: { commentNum: string; type: "upvote" | "downvote" }) => {
        voteMutate({ genre, commentNum, type });
    }, [genre, voteMutate]);

    const deleteCommentHandler = useCallback(({ commentNum }: { commentNum: string }) => {
        deleteMutate({ genre, commentNum });
    }, [deleteMutate, genre]);

    return (
        <ul css={style} >
            {
                data?.comments.map((comment, index) => (
                    <Comment
                        key={index}
                        genre={genre}
                        userImage={comment.userImage}
                        commentNum={comment.commentNum}
                        comment={comment.comment}
                        nickname={comment.nickname}
                        createdAt={comment.createdAt}
                        upvote={comment.upvote}
                        downvote={comment.downvote}
                        vote={voteHandler}
                        remove={deleteCommentHandler}
                        editMutate={editMutate}
                    />
                ))
            }
        </ul >
    );
}

const style = css`
    margin-top: 2rem;
`;

export default CommentList;