import { css } from "@emotion/react";
import React from "react";

interface FormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    direction: string;
    addCss?: [];
}
function Form(props: FormProps) {
    const { onSubmit, children, direction, addCss } = props;
    return (
        <form
            css={[css`display: flex; flex-direction: ${direction}`, addCss]}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}

export default Form;