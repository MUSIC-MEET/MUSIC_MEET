import { css } from "@emotion/react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import React, { useCallback, useContext, useRef, useState } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import ThemeContext from "../../../store/ThemeContext";
import RedButton from "components/common/RedButton";

function InputForm() {
    const ctx = useContext(ThemeContext);
    const editorRef = useRef<Editor>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

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

    return (
        <Form
            onSubmit={onSubmit}
            direction={"column"}
            addCss={[formStyle]}
        >
            <span>
                <label htmlFor="title">제목</label>
                <Input
                    w={"100%"}
                    h={"3rem"}
                    onChange={setTitle}
                    input={{
                        placeholder: "제목을 입력하세요",
                        name: "title",
                        id: "title",
                        type: "text",
                        value: title,
                        onChange: onChangeTitle
                    }}
                />
            </span>

            <span>
                <label htmlFor="content">내용</label>
                <Editor
                    initialEditType="wysiwyg"
                    height="40rem"
                    theme={ctx.theme}
                    previewStyle="vertical"
                    onChange={onChangeContent}
                    ref={editorRef}
                />
            </span>

            <RedButton
                value="작성"
                type={"submit"}
            />
        </Form>
    );
}

const formStyle = css`
    margin-top: 3rem;
    max-width: 100vw;
    justify-content: center;
    align-items: flex-start;

    & > input[type="submit"] {
        float: right;
        width: 5rem;
        height: 3.5rem;
    }

    span {
        width: 70rem;
        margin-bottom: 2rem;
    }

    span > label {
        display: block;
        margin-bottom: 0.5rem;
    }


`;

export default InputForm;