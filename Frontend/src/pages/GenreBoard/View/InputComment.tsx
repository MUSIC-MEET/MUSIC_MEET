import Form from "components/common/Form";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import writeComment from "utils/RequestApis/GenreBoard/writeComment";
import InputForm from "./InputForm";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

function InputComment() {
    const params = useParams<{ genre: string; num: string }>();
    const genre = params.genre ?? "kpop";
    const num = params.genre ?? "-1";
    const [comment, setComment] = useState<string>("");
    const { t } = useTranslation<"genreBoardViewer">("genreBoardViewer");
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const { mutate } = useMutation(writeComment, {
        useErrorBoundary: true,
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
            <InputForm
                comment={comment}
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