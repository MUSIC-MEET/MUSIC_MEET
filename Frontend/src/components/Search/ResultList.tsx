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
            <ul>
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
            </ul>
        </section>
    );
}

const style = css`
    position: absolute;
    border: 1px solid gray;

    width: 200%;
    max-height: 32rem;
    overflow-y: scroll;
    max-height: 15rem;
    border-radius: 5px;
    padding: 1rem;
    margin-top: 1rem;

    background-color: red;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    z-index: 100;

    & > li {
        margin-bottom: 1rem;
    }

    & > li:last-child {
        margin-bottom: 0;
    }

    
`;

export default ResultList;