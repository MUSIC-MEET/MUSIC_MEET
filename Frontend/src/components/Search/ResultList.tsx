import { css } from "@emotion/react";
import React, { useEffect } from "react";
import Music from "./Music";

function ResultList({ result }: { result: string; }) {
    useEffect(() => {
        //
    }, [result]);

    return (
        <section css={style}>
            <Music
                imgSrc={"http://naver.com"}
                musicNum={"1"}
                title={"title"}
                singer={"singer"}
            />
        </section>
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