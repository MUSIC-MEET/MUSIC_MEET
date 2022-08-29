import { css } from "@emotion/react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import React from "react";


interface InputFormProps {
    comment: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    text: {
        placeholder: string;
        submit: string;
    }
    isLogin: boolean;
}

function InputForm(props: InputFormProps) {
    const { comment, onChange, onSubmit, text, isLogin } = props;
    return (
        <Form
            direction="row"
            onSubmit={onSubmit}
            addCss={[formStyle]}
        >
            <Input
                input={{
                    type: "text",
                    value: comment,
                    onChange: onChange,
                    placeholder: text.placeholder,
                    disabled: !isLogin,
                }}
            />
            <Submit
                value={text.submit}
                disabled={!isLogin}
            />
        </Form >
    );
}

const formStyle = css`
    height: 2.5rem;
    display: flex;
    justify-content: flex-start;
    & > input[type="text"] {
        
        flex: 9;
    }

    & > input[type="submit"] {
        margin-left: 0.5rem;
        flex: 1;
    }
    
`;

export default React.memo(InputForm);