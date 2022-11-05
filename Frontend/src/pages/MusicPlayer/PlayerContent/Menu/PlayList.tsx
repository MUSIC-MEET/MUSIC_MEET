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
                className="playlist-item search"
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
    & > playlist-item {
        
    }
`;

export default PlayList;