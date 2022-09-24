import SectionWrapper from "components/common/SectionWrapper";
import React, { useCallback, useEffect, useState } from "react";
import CommentInputForm from "components/common/CommentInputForm";
import { useMutation } from "react-query";
import writeComment from "utils/RequestApis/Music/writeComment";
import { useTranslation } from "react-i18next";

interface CommentsProps {
    musicNum: string;
    className?: string;
}

function Comments(props: CommentsProps) {
    const { musicNum, className } = props;
    const [value, setValue] = useState<string>("");
    const { t } = useTranslation<"musicPage">("musicPage");

    useEffect(() => {
        //
    }, [musicNum]);

    const { mutate } = useMutation(["writeMusicComment", musicNum], writeComment, {
        useErrorBoundary: true,
        onSuccess: () => {
            //
        }
    });

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => e.target.value);
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ musicNum, comment: value });
        setValue(() => "");
    }, [musicNum, mutate, value]);

    return (
        <SectionWrapper className={className}>
            <CommentInputForm
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                text={{
                    placeholder: t("comments.input.placeholder"),
                    submit: t("comments.input.submit"),
                }}
                isLogin={true}
            />
        </SectionWrapper>
    );
}

export default Comments;