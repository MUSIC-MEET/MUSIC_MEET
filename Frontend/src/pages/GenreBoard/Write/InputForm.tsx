import { css } from "@emotion/react";
import Form from "components/common/Form";
import React from "react";

function InputForm() {
    return (
        <Form
            onSubmit={() => console.log("aa")}
            direction={"column"}
            addCss={[formStyle]}
        >
            InputForm
        </ Form>
    );
}

const formStyle = css`
    width: 80rem;
    justify-content: center;
    align-items: center;
`;

export default InputForm;