import React from "react";

interface CardMusicListProps {
    className?: string;
    list?: any;
}

function CardMusicList(props: CardMusicListProps) {
    return (
        <ul className={`${props?.className}`}>
            list
        </ul>
    );
}

export default CardMusicList;