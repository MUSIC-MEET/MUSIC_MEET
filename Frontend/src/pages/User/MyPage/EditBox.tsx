import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import React from "react";
import ValidResult from "pages/SignUp/ValidResult";



const SUBMIT_WIDTH = "2.5rem";
const WIDTH = "25rem";
const HEIGHT = "2rem";

interface EditBoxProps {
    label: string;
    input: {
        id: string;
        name: string;
        type: string;
        value: string;
        placeholder: string;
        disabled: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
    error: string;
    submit: string;
    onSubmit: (e: React.FormEvent<HTMLElement>) => void;
}

function EditBox(props: EditBoxProps) {
    const { label, input, submit, onSubmit, error } = props;
    return (
        <Form addCss={[formStyle]} direction="column" onSubmit={onSubmit}>
            <label htmlFor="id">{label}</label>
            <Wrap>
                <Input
                    w={WIDTH}
                    input={{ ...input }}
                />
                <Submit
                    value={submit}
                    w={SUBMIT_WIDTH}
                    h={HEIGHT}
                    disabled={error !== "valid"}
                />
            </Wrap>
            <ValidResult
                result={error}
                name={input.name}
            />
        </Form>
    );
}



const formStyle = css`
    & {
        margin-bottom: 1rem;
    }
    label {
        margin-bottom: 0.5rem;
    }
    input[type="submit"] {
        margin-left: 1rem;
    }
`;

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-between;

    & {
        margin-bottom: 0.8rem;
    }
`;
export default React.memo(EditBox);
export { EditBoxProps };