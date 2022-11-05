import React from "react";
import PlayListMusicType from "Types/PlayListMusicType";
import PlayListItem from "./PlayListItem";
import BaseProps from "components/common/BaseProps";

interface PlayListUIProps {
    list?: PlayListMusicType[]
    currentMusicId?: number;
}

function PlayListUI(props: PlayListUIProps & BaseProps) {
    return (
        <ul className={`${props?.className}`}>
            {props.list?.map((item, index) => (
                <PlayListItem
                    key={index}
                    index={index}
                    {...item}
                    isPlaying={props.currentMusicId === index}
                />
            ))}
        </ul>
    );
}

export default PlayListUI;