import Title from "components/common/Title";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import GenreSelector from "../GenreSelector";
import InputForm from "../InputForm";
import style from "../SectionStyle";
import { useMutation, useQuery } from "react-query";
import CurrentPage from "store/CurrentPage";
import { useSetRecoilState } from "recoil";
import getEditPost from "utils/RequestApis/GenreBoard/getEditPost";
import { Editor } from "@toast-ui/react-editor";
import editBoard from "utils/RequestApis/GenreBoard/editBoard";

function Edit() {
    const params = useParams<{ genre: string; id: string }>();
    const genre = params.genre ?? "kpop";
    const id = params.id ?? "-1";

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const editorRef = useRef<Editor>(null);
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    const setCurrentPage = useSetRecoilState(CurrentPage);
    const navigator = useNavigate();

    const { status, data } = useQuery(["editBoard"],
        async () => {
            return getEditPost({ genre, num: id });
        },
        {
            suspense: false,
            retry: 0,
        }
    );

    const { mutate } = useMutation(editBoard, {
        retry: 0,
        useErrorBoundary: true,
        onSuccess: () => {
            navigator(`/board/${genre}/post/${id}`);
        }
    });

    useEffect(() => {
        setCurrentPage(2);
        if (status === "success") {
            setTitle(() => data.title);
            setContent(() => data.content);
        }
    }, [status, data, setCurrentPage]);

    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(() => e.target.value);
    }, []);

    const onChangeContent = useCallback(() => {
        setContent(() => editorRef?.current!.getInstance().getMarkdown());
    }, []);

    const onSubmit = useCallback(() => {
        mutate({
            genre,
            num: id,
            title,
            content
        });
    }, [genre, id, title, content, mutate]);
    return (
        <section css={style}>
            <Title>{t("update")}</Title>
            <InputForm
                type="edit"
                title={title}
                content={content}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                onSubmit={onSubmit}
                goBackHandler={() => navigator(`/board/${genre}`)}
                editorRef={editorRef}
                setTitle={setTitle}
                setContent={setContent}
            />
        </section>
    );
}

export default Edit;