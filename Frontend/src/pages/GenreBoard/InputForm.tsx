import { css } from "@emotion/react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import ThemeContext from "../../store/ThemeContext";
import BottomButton from "./BottomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GenreBoardContext from "store/GenreBoardContext";
import write from "utils/RequestApis/GenreBoard/write";
import { useMutation } from "react-query";
import uploadImg from "../../utils/RequestApis/GenreBoard/uploadImg";
import { useRecoilValue } from "recoil";
import LoginModalShownState from "store/LoginModalShown";
import BackupAlertWrapper from "./BackupAlertWrapper";

interface InputFormProps {
    type: "write" | "edit";
    title: string;
    content: string;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeContent: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    goBackHandler: () => void;
    editorRef: React.RefObject<Editor>;
}


function InputForm(props: InputFormProps) {
    const { title, content, onChangeTitle, onChangeContent, onSubmit, goBackHandler, editorRef, type }
        = props;
    const ctx = useContext(ThemeContext);
    const isShwonLoginForm = useRecoilValue<boolean>(LoginModalShownState);
    const [backupWrapperShown, setBackupWrapperShown] =
        useState<boolean>(() => localStorage.getItem("backup_board") ? true : false);
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    useEffect(() => {
        //
    }, [isShwonLoginForm]);


    return (
        <Form
            onSubmit={onSubmit}
            direction={"column"}
            addCss={[formStyle]}
        >
            {backupWrapperShown &&
                <BackupAlertWrapper
                    setTitle={props.setTitle}
                    setContent={props.setContent}
                    ref={editorRef}
                    close={() => setBackupWrapperShown(false)}
                />
            }
            <span>
                <label htmlFor="title">{t("input.titleLabel")}</label>
                <Input
                    w={"100%"}
                    h={"3rem"}
                    onChange={onChangeTitle}
                    input={{
                        placeholder: t("input.titlePlaceholder"),
                        name: "title",
                        id: "title",
                        type: "text",
                        value: title,
                        onChange: onChangeTitle,
                    }}
                />
            </span>

            <span>
                <label htmlFor="content">{t("input.contentLabel")}</label>
                <Editor
                    initialValue={content}
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
    position: relative;

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