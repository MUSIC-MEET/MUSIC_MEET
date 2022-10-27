import React from "react";
import MusicType from "./MusicType";
import CardMusicItem from "./CardMusicItem";
import { css } from "@emotion/react";

interface CardMusicListProps {
    className?: string;
    list?: MusicType[];
    type: "cover" | "music";
}

function CardMusicList(props: CardMusicListProps) {
    return (
        <ul className={`${props?.className}`} css={style}>
            {props.list?.map((item) => (
                <CardMusicItem
                    key={item.id}
                    {...item}
                    className="item"
                    type={props.type}
                />
            ))}
        </ul>
    );
}

const style = css`
    width: 100%;
    height: auto;
    margin: 3rem 0;
    margin-left: 3rem;
    & > .item {
        margin-bottom: 1rem;
    }

    & > .item:nth-last-child(1) {
        margin-bottom: 0;
    }
`;

export default CardMusicList;