import React from "react";
import MusicType from "components/common/MusicType";

interface CardMusicItemProps {
    className?: string;
}

function CardMusicItem(props: CardMusicItemProps & MusicType) {
    return (
        <li className={`${props.className}`}>
        </li>
    );
}

export default CardMusicItem;