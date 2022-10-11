import React, { useCallback, useState } from "react";
import SectionWrapper from "components/common/SectionWrapper";
import { useParams } from "react-router-dom";
import CommentInputForm from "components/common/CommentInputForm";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import CommentList from "pages/GenreBoard/View/CommentList";

/**
 * 커버 댓글 컴포넌트
 * @returns 
 */
function Comments() {
    const { id } = useParams<{ id: string }>();
    const [value, setValue] = useState<string>("");
    const { t } = useTranslation<"coverViewPage">("coverViewPage");
    const { isLogIn } = useRecoilValue(LoginState);

    const valueChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => event.target.value);
    }, []);

    const commentSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

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
            <CommentList />
        </SectionWrapper>
    );
}

export default Comments;