import { css } from "@emotion/react";
import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import deleteComment from "utils/RequestApis/Music/deleteComment";
import editComment from "utils/RequestApis/Music/editComment";
import fetchMusicCommentList from "utils/RequestApis/Music/fetchCommentList";
import Comment from "components/common/Comment";
/**
 * 음악 페이지 댓글 리스트 컴포넌트
 * @param props
 * @param {string} props.musicNum 음악 번호
 * @returns 
 */
function CommentList({ musicNum }: { musicNum: string; }) {
    useEffect(() => {
        //
    }, [musicNum]);

    const queryClient = useQueryClient();

    const { data } = useQuery(["fetchMusicComment", musicNum],
        () => fetchMusicCommentList({ musicNum }),
        {
            retry: 0,
        }
    );

    const { mutate: deleteMutate } = useMutation(["deleteMusicComment", musicNum], deleteComment,
        {
            useErrorBoundary: true,
            onSuccess: () => {
                queryClient.invalidateQueries("fetchMusicComment");
            }
        }
    );

    const { mutate: editMutate } = useMutation(["editMusicComment", musicNum], editComment,
        {
            useErrorBoundary: true,
            onSuccess: () => {
                queryClient.invalidateQueries("fetchMusicComment");
            }
        }
    );

    const onDeleteHandler = useCallback((commentNum: string) => {
        deleteMutate({ commentNum });
    }, [deleteMutate]);

    const onEditHandler = useCallback((commentNum: string, newComment: string) => {
        editMutate({ commentNum, newComment });
    }, [editMutate]);

    return (
        <ul css={css`margin-top: 1rem;`}>
            {data?.map((comment) => (
                <Comment
                    key={comment.commentNum}
                    imgSrc={comment.imgSrc}
                    id={comment.commentNum}
                    comment={comment.comment}
                    user={comment.user}
                    createdAt={comment.createdAt}
                    onDelete={onDeleteHandler}
                    onEdit={onEditHandler}
                />
            ))
            }
        </ul >
    );
}

export default CommentList;