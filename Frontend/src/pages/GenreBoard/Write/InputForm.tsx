import { css } from "@emotion/react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import React, { useCallback, useContext, useRef, useState } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import ThemeContext from "../../../store/ThemeContext";
import BottomButton from "./BottomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function InputForm({ genre: genre }: { genre: string }) {
    const ctx = useContext(ThemeContext);
    const editorRef = useRef<Editor>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const navigator = useNavigate();
    const { t } = useTranslation<"genreWritePage">("genreWritePage");

    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(() => e.target.value);
    }, []);

    const onChangeContent = useCallback(() => {
        setContent(editorRef?.current!.getInstance().getMarkdown());
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(title, content);
    }, [content, title]);

    const goBackHandler = useCallback(() => {
        navigator(`/board/${genre}`);
    }, [genre, navigator]);

    return (
        <Form
            onSubmit={onSubmit}
            direction={"column"}
            addCss={[formStyle]}
        >
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