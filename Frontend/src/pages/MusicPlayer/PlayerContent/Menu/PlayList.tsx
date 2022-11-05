import React, { useContext } from "react";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import PlayListUI from "./PlayListUI";

function PlayList() {
    const ctx = useContext(MusicPlayerContenxt);
    return (
        <article>
            <div> search</div>
            <PlayListUI
                list={ctx.playList}
                currentMusicId={ctx.currentMusicIndex ?? 0}
            />
        </article>
    );
}

export default PlayList;