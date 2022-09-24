import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import deleteComment from "utils/RequestApis/Music/deleteComment";
import fetchMusicCommentList from "utils/RequestApis/Music/fetchCommentList";
import Comment from "./Comment";
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

    const onDeleteHandler = useCallback((commentNum: string) => {
        console.log("delete", commentNum);
        deleteMutate({ commentNum });
    }, [deleteMutate]);

    const onEditHandler = useCallback((commentNum: string) => {
        console.log("edit", commentNum);
    }, []);
    return (
        <ul>
            {data?.map((comment) => (
                <Comment
                    key={comment.commentNum}
                    imgSrc={comment.imgSrc}
                    commentNum={comment.commentNum}
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