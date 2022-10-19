import { css } from "@emotion/react";
import styled from "@emotion/styled";
import MusicItem from "components/common/MusicItem";
import React from "react";

interface MusicListProps {
    list: any[];
    itemWidth: string;
    itemHeight: string;
}

function MusicList(props: MusicListProps) {

    return (
        <Ul
            itemWidth={props.itemWidth}
            itemHeight={props.itemHeight}
        >
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
        </Ul>
    );
}

const Ul = styled.ul<{ itemWidth: string; itemHeight: string; }>`
    display: flex;
    flex-direction: row;
    width: 200%;
    .item {
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        width: ${props => props.itemWidth};
        height: ${props => props.itemHeight};
    }
`;

export default MusicList;