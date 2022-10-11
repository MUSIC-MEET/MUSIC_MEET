import React, { useCallback, useState } from "react";
import SectionWrapper from "components/common/SectionWrapper";
import { useParams } from "react-router-dom";
import CommentInputForm from "components/common/CommentInputForm";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import { useMutation, useQueryClient } from "react-query";
import submitComment from "utils/RequestApis/Cover/submitComment";
import CommentList from "./CommentList";

/**
 * 커버 댓글 컴포넌트
 * @returns 
 */
function Comments() {
    const { id } = useParams<{ id: string }>();
    const [value, setValue] = useState<string>("");
    const { t } = useTranslation<"coverViewPage">("coverViewPage");
    const { isLogIn } = useRecoilValue(LoginState);
    const queryClient = useQueryClient();
    const { mutate: submitMutate } = useMutation(["coverCommentSubmit"], submitComment, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 201) {
                setValue("");
                queryClient.invalidateQueries(["fetchCoverCommentList"]);
            }
        }
    });

    const valueChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => event.target.value);
    }, []);

    const commentSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value.length == 0) return;
        submitMutate({ id: id ?? "-1", comment: value });
    }, [id, submitMutate, value]);

    return (
        <SectionWrapper>
            <CommentInputForm
                value={value}
                onChange={valueChangeHandler}
                onSubmit={commentSubmitHandler}
                text={{
                    placeholder: t("comment.input.placeholder"),
                    submit: t("comment.input.submit"),
                }}
                isLogin={isLogIn}
            />
            <CommentList
                id={id}
            />
        </SectionWrapper >
    );
}

export default Comments;