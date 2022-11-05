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
    height: 80vh;
    overflow-y: scroll;
    line-height: 1.5;
    margin-top: 1.2rem;
    & > .lyrics {
        font-size: 1.2rem;
        text-align: center;
    }
`;
export default MenuContent;