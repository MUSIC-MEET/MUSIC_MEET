import { css } from "@emotion/react";
import React from "react";

interface ContentProps {
    children: React.ReactNode;
}
function FindContentBox(props: ContentProps) {
    const { children } = props;
    return (
        <section css={style} >
            {children}
        </section>
    );
}


const style = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default FindContentBox;