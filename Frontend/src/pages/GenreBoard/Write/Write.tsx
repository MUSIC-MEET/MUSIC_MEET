import Title from "components/common/Title";
import React, { useCallback, useRef, useState } from "react";
import GenreSelector from "../GenreSelector";
import { useNavigate, useParams } from "react-router-dom";
import InputForm from "../InputForm";
import { useTranslation } from "react-i18next";
import { Editor } from "@toast-ui/react-editor";
import { useMutation } from "react-query";
import write from "utils/RequestApis/GenreBoard/write";

/**
 * 작성글 컴포넌트
 * @returns {JSX.Element}
 */
function Write() {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    const navigator = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const editorRef = useRef<Editor>(null);


    const goBackHandler = useCallback(() => {
        navigator(`/board/${genre}`);
    }, [genre, navigator]);

    /**
     * 장르 게시판에 글을 작성
     */
    const { mutate } = useMutation(write, {
        retry: 0,
        useErrorBoundary: true,
        onSuccess: () => {
            localStorage.removeItem("backup_board");
            goBackHandler();
        },
    });

    /**
     * 제목, 내용 백업해서 localStorage에 저장
     */
    const postBackup = useCallback(() => {
        const backup = {
            title: title,
            content: content
        };
        localStorage.setItem("backup_board", JSON.stringify(backup));
    }, [content, title]);

    /**
     * 제목이 변경될때마다 호출
     */
    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(() => e.target.value);
        postBackup();
    }, [postBackup]);

    /**
     * 내용이 변경될때마다 호출
     */
    const onChangeContent = useCallback(() => {
        setContent(() => editorRef?.current!.getInstance().getMarkdown());
        postBackup();
    }, [postBackup]);

    /**
     * 게시글 작성 버튼 클릭 
     */
    const onSubmit = useCallback(() => {
        mutate({
            genre,
            title,
            content,
        });
    }, [content, genre, mutate, title]);

    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <GenreSelector
                write={true}
            />

            <InputForm
                type={"write"}
                title={title}
                content={content}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                onSubmit={onSubmit}
                setTitle={setTitle}
                setContent={setContent}
                goBackHandler={goBackHandler}
                editorRef={editorRef}
            />
        </React.Fragment>
    );
}



export default React.memo(Write);