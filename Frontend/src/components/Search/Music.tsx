import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchMusicType from "./SearchMusicType";

function Music(props: SearchMusicType & { onClose: () => void; }) {
    const { musicNum, imgSrc, title, singer, onClose } = props;
    const navigator = useNavigate();
    const onClickHandler = useCallback(() => {
        navigator(`/music/${musicNum}`);
        onClose();
    }, [musicNum, navigator]);
    return (
        <div css={style} onClick={onClickHandler}>
            <img src={imgSrc} alt="music" />
            <span>{title}</span>
            <span>{singer}</span>
        </div>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    cursor: pointer;
`;

export default Music;