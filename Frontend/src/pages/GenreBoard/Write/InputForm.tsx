import { css } from "@emotion/react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import ThemeContext from "../../../store/ThemeContext";
import BottomButton from "./BottomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GenreBoardContext from "store/GenreBoardContext";
import write from "utils/RequestApis/GenreBoard/write";
import { useMutation } from "react-query";
import uploadImg from "../../../utils/RequestApis/GenreBoard/uploadImg";
import ConfirmModal from "../../../components/AlertModal/ConfirmModal";
import { useRecoilValue } from "recoil";
import LoginModalShownState from "store/LoginModalShown";

function InputForm() {
    const ctx = useContext(ThemeContext);
    const { genre } = useContext(GenreBoardContext);
    const editorRef = useRef<Editor>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const isShwonLoginForm = useRecoilValue<boolean>(LoginModalShownState);
    const [hasBackup, setHasBackup] =
        useState<boolean>(() => localStorage.getItem("backup_board") ? true : false);
    const navigator = useNavigate();
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    useEffect(() => {
        //
    }, [isShwonLoginForm]);
    const goBackHandler = useCallback(() => {
        navigator(`/board/${genre}`);
    }, [genre, navigator]);

    const { mutate } = useMutation(write, {
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
    const onSubmit = useCallback((e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        mutate({
            genre,
            title,
            content,
        });
    }, [content, genre, mutate, title]);

    /**
     * 백업 적용
     */
    const applyBackupHandler = useCallback(() => {
        const backup = JSON.parse(localStorage.getItem("backup_board") || "{}");
        setTitle(() => backup.title);
        setContent(() => backup.content);
        editorRef?.current!.getInstance().setMarkdown(backup.content);
        setHasBackup(() => false);
    }, []);

    /**
     * 백업 삭제
     */
    const dropBackupHandler = useCallback(() => {
        localStorage.removeItem("backup_board");
        setHasBackup(() => false);
    }, []);

    return (
        <Form
            onSubmit={onSubmit}
            direction={"column"}
            addCss={[formStyle]}
        >
            {hasBackup &&
                <div>
                    <ConfirmModal
                        title={t("backup.title")}
                        content={t("backup.content")}
                        confirmButtonText={t("backup.confirm")}
                        cancelButtonText={t("backup.cancel")}
                        onConfirm={applyBackupHandler}
                        onCancel={dropBackupHandler}
                        onClose={dropBackupHandler}
                    />
                </div>
            }
            <span>
                <label htmlFor="title">{t("input.titleLabel")}</label>
                <Input
                    w={"100%"}
                    h={"3rem"}
                    onChange={setTitle}
                    input={{
                        placeholder: t("input.titlePlaceholder"),
                        name: "title",
                        id: "title",
                        type: "text",
                        value: title,
                        onChange: onChangeTitle
                    }}
                />
            </span>

            <span>
                <label htmlFor="content">{t("input.contentLabel")}</label>
                <Editor
                    initialEditType="wysiwyg"
                    height="40rem"
                    theme={ctx.theme}
                    previewStyle="vertical"
                    onChange={onChangeContent}
                    ref={editorRef}
                    placeholder={t("input.contentPlaceholder")}
                    hooks={{
                        addImageBlobHook: async (blob: Blob, callback: (url: string) => void) => {
                            const response = await uploadImg(blob);
                            const { imgSrc } = response.data;
                            callback(imgSrc);
                        }
                    }}

                />
            </span>
            <BottomButton goBackHandler={goBackHandler} />
        </Form>
    );
}

const formStyle = css`
    margin-top: 3rem;
    max-width: 100vw;
    justify-content: center;
    align-items: flex-start;


    span {
        width: 70rem;
        margin-bottom: 2rem;
    }

    span > label {
        display: block;
        margin-bottom: 0.5rem;
    }


`;

export default React.memo(InputForm);