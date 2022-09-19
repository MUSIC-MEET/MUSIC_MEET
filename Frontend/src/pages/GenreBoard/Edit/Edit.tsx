import Title from "components/common/Title";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import InputForm from "../InputForm";
import style from "../SectionStyle";
import { useMutation, useQuery, useQueryClient } from "react-query";
import getEditPost from "utils/RequestApis/GenreBoard/getEditPost";
import { Editor } from "@toast-ui/react-editor";
import editBoard from "utils/RequestApis/GenreBoard/editBoard";
import DeletePostAlert from "../View/DeletePostAlert";

function Edit() {
    const params = useParams<{ genre: string; id: string }>();
    const genre = params.genre ?? "kpop";
    const id = params.id ?? "-1";

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const editorRef = useRef<Editor>(null);
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    const navigator = useNavigate();
    const queryClient = useQueryClient();
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const { status, data } = useQuery(["editBoard"],
        async () => {
            return getEditPost({ genre, num: id });
        },
        {
            useErrorBoundary: false,
            suspense: false,
            retry: 0,
            onError: () => {
                setIsDeleted(true);
            }
        }
    );

    const goPost = useCallback(() => {
        navigator(`/board/${genre}/post/${id}`);
    }, [genre, id, navigator]);

    const { mutate } = useMutation(editBoard, {
        retry: 0,
        onSuccess: () => {
            queryClient.removeQueries(["genreBoardPost"]);
            goPost();
        },
        onError: () => {
            setIsDeleted(true);
        }

    });

    useEffect(() => {
        if (status === "success") {
            setTitle(() => data.title);
            editorRef.current?.getInstance().setMarkdown(data.content);
            setContent(() => data.content);
        }
    }, [status, data]);

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
            {isDeleted && <DeletePostAlert />}
            <InputForm
                type="edit"
                title={title}
                content={content}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                onSubmit={onSubmit}
                goBackHandler={goPost}
                editorRef={editorRef}
                setTitle={setTitle}
                setContent={setContent}
            />
        </section>
    );


}

export default Edit;