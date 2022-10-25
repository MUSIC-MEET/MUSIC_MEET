import { css } from "@emotion/react";
import React from "react";

interface TextProps {
    text?: string;
}

function Text(props: TextProps) {
    return (
        <div css={css`margin-top: 0.5rem; margin-bottom: 1.2rem;`}>
            <h3>{props.text}</h3>
            <hr />
        </div>
    );
}

export default Text;