import { css } from "@emotion/react";
import React, { useEffect } from "react";

function ResultList({ result }: { result: string; }) {
    useEffect(() => {
        //
    }, [result]);

    return (
        <section css={style}>{result}</section>
    );
}

const style = css`
    position: absolute;
    margin-top: 1rem;
    width: 200%;
    min-height: 30px;
    border-radius: 5px;
    background-color: red;
    color: white;
    text-overflow: ellipsis;

    display: flex;
    padding-left: 1rem;
    justify-content: flex-start;
    align-items: center;
`;

export default ResultList;