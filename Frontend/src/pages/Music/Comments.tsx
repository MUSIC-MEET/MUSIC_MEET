import SectionWrapper from "components/common/SectionWrapper";
import React, { useCallback, useEffect, useState } from "react";
import CommentInputForm from "components/common/CommentInputForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import writeComment from "utils/RequestApis/Music/writeComment";
import { useTranslation } from "react-i18next";
import CommentList from "./CommentList";
import fetchMusicCommentList from "../../utils/RequestApis/Music/fetchCommentList";

interface CommentsProps {
    musicNum: string;
    className?: string;
}

function Comments(props: CommentsProps) {
    const { musicNum, className } = props;
    const [value, setValue] = useState<string>("");
    const { t } = useTranslation<"musicPage">("musicPage");
    const queryClient = useQueryClient();
    useEffect(() => {
        //
    }, [musicNum]);

    const { data } = useQuery(["fetchMusicComment", musicNum],
        () => fetchMusicCommentList({ musicNum }),
        {
            retry: 0,
        }
    );


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
            <CommentList />
        </SectionWrapper>
    );
}

export default Comments;