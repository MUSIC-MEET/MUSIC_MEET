import { css } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import Music from "./Music";
import SearchMusicType from "components/Search/SearchMusicType";
import ThemeContext from "store/ThemeContext";

function ResultList({ result, onClose }: { result: SearchMusicType[]; onClose: () => void; }) {
    const ctx = useContext(ThemeContext);
    const { fontColor, searchBackground } = ctx.themeStyle.menu;

    useEffect(() => {
        //
    }, [result]);

    return (
        <section css={[style, css`color: ${fontColor}; background:${searchBackground};`]}>
            {result.map((music) => (
                <Music
                    key={music.musicNum}
                    imgSrc={music.imgSrc}
                    musicNum={music.musicNum}
                    title={music.title}
                    singer={music.singer}
                    onClose={onClose}
                />
            ))}

        </section>
    );
}

const style = css`
    position: absolute;
    border: 1px solid gray;

    width: 200%;
    min-height: 30px;
    max-height: 400px;
    border-radius: 5px;
    padding: 1rem;
    margin-top: 1rem;

    background-color: red;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;


    & > section {
        margin-bottom: 1rem;
    }

    & > section:last-child {
        margin-bottom: 0;
    }

    
`;

export default ResultList;