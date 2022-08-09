import { css } from "@emotion/react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import React from "react";

function InputForm() {
    return (
        <Form
            onSubmit={() => console.log("aa")}
            direction={"column"}
            addCss={[formStyle]}
        >
            <span>
                <label htmlFor="title">제목</label>
                <Input
                    w={"100%"}
                    h={"3rem"}
                    input={{
                        placeholder: "제목을 입력하세요",
                        name: "title",
                        id: "title",
                        type: "text"
                    }}
                />
            </span>

            <span>
                <label htmlFor="content">내용</label>
            </span>
        </ Form>
    );
}

const formStyle = css`
    margin-top: 3rem;
    max-width: 100vw;
    justify-content: center;
    align-items: flex-start;

    span {
        width: 70rem;
        margin-bottom: 3rem;
    }

    span > label {
        display: block;
        margin-bottom: 0.5rem;
    }
`;

export default InputForm;