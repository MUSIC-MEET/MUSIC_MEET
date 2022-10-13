import { css } from "@emotion/react";
import React from "react";

function Title(props: { children: string }) {
    return (<div className="title"><h1 css={[style]}> {props.children}</h1 ></div>);
}

const style = css`
    margin-top: 2rem;
    font-weight: 700;
    font-size: 2.6rem;
    margin-bottom: 50px;
`;

export default React.memo(Title);