import { css } from "@emotion/react";
import React from "react";

interface MenuContentProps {
    component: React.ReactNode;
}

function MenuContent(props: MenuContentProps) {
    return (
        <div css={style}>
            {props.component}
        </div>
    );
}

const style = css`
    width: 100%;
    height: 70vh;
    overflow-y: scroll;
    line-height: 1.5;

    & > .lyrics {
        font-size: 1.2rem;
        margin-top: 1rem;
        text-align: center;
    }
`;
export default MenuContent;