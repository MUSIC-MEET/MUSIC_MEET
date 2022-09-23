import Form from "components/common/Form";
import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import writeComment from "utils/RequestApis/GenreBoard/writeComment";

import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import CommentInputForm from "components/common/CommentInputForm";

function InputComment() {
    const params = useParams<{ genre: string; num: string }>();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "-1";
    const [comment, setComment] = useState<string>("");
    const { t } = useTranslation<"genreBoardViewer">("genreBoardViewer");
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const queryClient = useQueryClient();
    const { mutate } = useMutation(writeComment, {
        useErrorBoundary: true,
        onSuccess: () => {
            queryClient.invalidateQueries(["commentList", genre, num]);
        }
    });

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment.length !== 0) {
            mutate({ genre, num, comment });
            setComment("");
            return;
        }
    }, [comment, genre, mutate, num]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }, []);
    return (
        <React.Fragment>
            <CommentInputForm
                value={comment}
                onChange={onChange}
                onSubmit={onSubmit}
                text={{
                    placeholder:
                        isLogIn ? t("comment.input.placeholder.login") : t("comment.input.placeholder.notLogin"),
                    submit: t("comment.input.submit"),
                }}
                isLogin={isLogIn}
            />
        </React.Fragment>
    );
}

export default React.memo(InputComment);