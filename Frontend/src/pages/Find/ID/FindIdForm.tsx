import React from "react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";

interface FindIdFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    submitText: string;
    email: string;
}
function FindIdForm(props: FindIdFormProps) {
    const { onSubmit, onChange, placeholder, submitText, email } = props;
    return (
        <Form onSubmit={onSubmit} direction={"row"}>
            <Input
                type="email"
                w={"25rem"}
                h={"2.5rem"}
                input={{
                    id: "email",
                    placeholder: placeholder,
                    type: "email",
                    value: email,
                    onChange: onChange
                }}
            />
            <Submit
                w={"5rem"}
                h={"2.5rem"}
                value={submitText}
                disabled={!email}
            />
        </Form>
    );
}

export default FindIdForm;