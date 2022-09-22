import { css } from "@emotion/react";
import React, { useEffect } from "react";
import Music from "./Music";
import SearchMusicType from "components/Search/SearchMusicType";

function ResultList({ result }: { result: SearchMusicType[]; }) {
    useEffect(() => {
        //
    }, [result]);

    return (
        <section css={style}>
            {result.map((music) => (
                <Music
                    key={music.musicNum}
                    imgSrc={music.imgSrc}
                    musicNum={music.musicNum}
                    title={music.title}
                    singer={music.singer}
                />
            ))}

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