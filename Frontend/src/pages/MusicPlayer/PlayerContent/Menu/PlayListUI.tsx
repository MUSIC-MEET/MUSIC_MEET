import React from "react";
import PlayListMusicType from "Types/PlayListMusicType";
import PlayListItem from "./PlayListItem";

interface PlayListUIProps {
    list?: PlayListMusicType[]
    currentMusicId?: number;
}

function PlayListUI(props: PlayListUIProps) {
    return (
        <ul>
            {props.list?.map((item, index) => (
                <PlayListItem
                    key={index}
                    {...item}
                    isPlaying={props.currentMusicId === index}
                />
            ))}
        </ul>
    );
}

export default PlayListUI;