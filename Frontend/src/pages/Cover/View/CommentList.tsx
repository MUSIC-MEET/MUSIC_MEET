import React, { useCallback } from "react";
import { useQuery } from "react-query";
import fetchCoverCommentList from "utils/RequestApis/Cover/fetchCoverCommentList";
import Comment from "components/common/Comment";

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

    const onDeleteHandler = useCallback((commentNum: string) => {
        // TODO
    }, []);

    const onEditHandler = useCallback((commentNum: string, newComment: string) => {
        // TODO
    }, []);
    return (
        <ul>
            {data?.map((comment) => (
                <Comment
                    key={comment.id}
                    imgSrc={comment.imgSrc}
                    id={comment.id}
                    comment={comment.comment}
                    onDelete={onDeleteHandler}
                    onEdit={onEditHandler}
                />
            ))}
        </ul>
    );
}

export default CommentList;