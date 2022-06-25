import { css } from "@emotion/react";
import React from "react";

interface FormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    direction: string;
}
function Form(props: FormProps) {
    const { onSubmit, children, direction } = props;
    return (
        <form
            css={css`display: flex; flex-direction: ${direction}`}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}

export default Form;