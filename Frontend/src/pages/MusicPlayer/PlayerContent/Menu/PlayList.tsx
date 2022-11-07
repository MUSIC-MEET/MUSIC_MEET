import { css } from "@emotion/react";
import React, { useContext } from "react";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import PlayListUI from "./PlayListUI";
import Search from "./Search";

function PlayList() {
    const ctx = useContext(MusicPlayerContenxt);
    return (
        <article css={style}>
            <Search
                className="playlist-item search-form"
            />
            <PlayListUI
                className="playlist-item playlist"
                list={ctx.playList}
                currentMusicId={ctx.currentMusicIndex ?? 0}
            />
        </article>
    );
}

const style = css`
    position: relative;
    width: 100%;
    height: 100%;
    & > .playlist-item {
        width: 100%;
        height: auto;
    }

    & > .playlist {
        margin-top: 1rem;
        padding-bottom: 1rem;
    }

`;

export default PlayList;