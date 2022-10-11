import React, { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fetchCoverCommentList from "utils/RequestApis/Cover/fetchCoverCommentList";
import Comment from "components/common/Comment";
import editCoverComment from "utils/RequestApis/Cover/editCoverComment";
import deleteCoverComment from "utils/RequestApis/Cover/deleteCoverComment";

interface CommentListProps {
    id?: string;
}

/**
 * Cover View 페이지 댓글 리스트 컴포넌트
 * @param props.id Cover 번호
 * @returns 
 */
function CommentList(props: CommentListProps) {
    const { data } = useQuery(["fetchCoverCommentList"], () => fetchCoverCommentList(props.id ?? "-1"));
    const queryClient = useQueryClient();
    const { mutate: editMutate } = useMutation(["editCoverComment", props.id], editCoverComment, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 204) {
                queryClient.invalidateQueries("fetchCoverCommentList");
            }
        }
    });

    const { mutate: deleteMutate } = useMutation(["deleteCoverComment", props.id], deleteCoverComment, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 204) {
                queryClient.invalidateQueries("fetchCoverCommentList");
            }
        }
    });
    const onDeleteHandler = useCallback((commentNum: string) => {
        deleteMutate(commentNum);
    }, [deleteMutate]);

    const onEditHandler = useCallback((commentNum: string, newComment: string) => {
        editMutate({ id: commentNum, comment: newComment });
    }, [editMutate]);
    return (
        <ul style={{ "marginTop": "1rem" }}>
            {data?.map((comment) => (
                <Comment
                    key={comment.id}
                    imgSrc={comment.imgSrc}
                    id={comment.id}
                    user={comment.user}
                    comment={comment.comment}
                    onDelete={onDeleteHandler}
                    onEdit={onEditHandler}
                />
            ))}
        </ul>
    );
}

export default CommentList;