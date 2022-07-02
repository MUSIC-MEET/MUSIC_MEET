import React from "react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import { css } from "@emotion/react";

interface FindIdFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: {
        id: string;
        email: string;
    };
    placeholder: {
        id: string;
        email: string;
    }
    values: {
        id: string;
        email: string;
    }
}

function FindPasswordForm(props: FindIdFormProps) {
    const { onSubmit, onChange, label, placeholder, values } = props;
    return (
        <Form addCss={[formStyle]} onSubmit={onSubmit} direction={"column"}>
            <label htmlFor="id">{label.id}</label>
            <Input
                input={{
                    type: "text",
                    value: values.id,
                    id: "id",
                    name: "id",
                    onChange: onChange,
                    placeholder: placeholder.id
                }
                }
            />
            <label htmlFor="email">{label.email}</label>
            <Input
                input={{
                    type: "email",
                    value: values.email,
                    id: "email",
                    name: "email",
                    onChange: onChange,
                    placeholder: placeholder.email
                }}
            />
            <Submit
                value="전송"
                disabled={!values.id || !values.email}
            />
        </Form>
    );
}

const formStyle = css`
    label {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    input {
        width:25rem;
        height: 2.5rem;
    }

    input[type="submit"] {
        margin-top: 1rem;
    }
`;


export default FindPasswordForm;