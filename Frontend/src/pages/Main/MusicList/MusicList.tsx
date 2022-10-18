import { css } from "@emotion/react";
import MusicItem from "components/common/MusicItem";
import React from "react";

function MusicList() {
    return (
        <div css={style}>
            <MusicItem
                className="item"
                imgSrc="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                singer="아이유"
                title="나쁜날"
            />
        </div >
    );
}

const style = css`
    .item {
        width: 5rem;
        height: 5rem;
    }
`;

export default MusicList;