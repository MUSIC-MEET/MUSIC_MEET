import SectionWrapper from "components/common/SectionWrapper";
import React, { useCallback, useEffect, useState } from "react";
import CommentInputForm from "components/common/CommentInputForm";
import { useMutation, useQueryClient } from "react-query";
import writeComment from "utils/RequestApis/Music/writeComment";
import { useTranslation } from "react-i18next";
import CommentList from "./CommentList";

interface CommentsProps {
    musicNum: string;
    className?: string;
}

/**
 * 음악 페이지 댓글 컴포넌트
 * @param props 
 * @param {string} props.musicNum 음악 번호
 * @param {string} props.className
 * @returns 
 */
function Comments(props: CommentsProps) {
    const { musicNum, className } = props;
    const [value, setValue] = useState<string>("");
    const { t } = useTranslation<"musicPage">("musicPage");
    const queryClient = useQueryClient();
    useEffect(() => {
        //
    }, [musicNum]);

    const { mutate } = useMutation(["writeMusicComment", musicNum], writeComment, {
        useErrorBoundary: true,
        onSuccess: () => {
            queryClient.invalidateQueries("fetchMusicComment");
        }
    });

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => e.target.value);
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.length === 0) return;
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
            <CommentList
                musicNum={musicNum}
            />
        </SectionWrapper>
    );
}

export default Comments;