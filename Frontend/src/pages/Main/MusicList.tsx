import { css } from "@emotion/react";
import MusicItem from "components/common/MusicItem";
import React from "react";

interface MusicListProps {
    list: any[];
}

function MusicList(props: MusicListProps) {
    return (
        <div css={container}>
            <ul>
                {
                    props.list.map((item) => (
                        <MusicItem
                            key={item.musicNum}
                            className="item"
                            imgSrc={item.imgSrc}
                            title={item.title}
                            singer={item.artist}
                        />
                    ))
                }
            </ul>
        </div >

    );
}

const container = css`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;

    ul {
        display: flex;
        flex-direction: row;
        width: 100%;
        position: relative;
        overflow-X: scroll;
    }

    ul .item {
        width: 8rem;
        height: 8rem;
        margin: 0 1rem;
    }
`;

export default MusicList;