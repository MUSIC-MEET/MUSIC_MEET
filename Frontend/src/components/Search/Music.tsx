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
        <li css={style} onClick={onClickHandler}>
            <figure>
                <img src={imgSrc} alt="music" />
            </figure>
            <div>
                <span>{title}</span>
                <span>{singer}</span>
            </div>
        </li>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
    figure {
        width: 3rem;
        height: 3rem;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 0.5rem;
        line-height: 1.4;
    }

    &:hover {
        background: rgba(88, 88, 88, 0.1);
    }
`;

export default Music;