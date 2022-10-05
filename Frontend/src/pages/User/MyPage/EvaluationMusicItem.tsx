import { css } from "@emotion/react";
import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "store/ThemeContext";
import LatestEvaluationMusic from "./LatestEvaluationType";

/**
 * 최근 평가한 음악 아이템
 * @returns 
 */
function EvaluationMusicItem(props: LatestEvaluationMusic) {
    const ctx = useContext(ThemeContext);
    const { color } = ctx.themeStyle.fontStyle2;
    const navigator = useNavigate();

    const onClickHanlder = useCallback(() => {
        navigator(`/music/${props?.musicNum}`);
    }, [navigator, props.musicNum]);

    return (
        <li css={style} onClick={onClickHanlder}>
            <figure>
                <img src={props?.imgSrc} alt="" />
            </figure>
            <div className="text-box">
                <div className="music-info info">
                    <span className="title">{props?.title}</span>
                    <span className="singer">{props?.singer}</span>
                </div>
                <div className="comment-info info">
                    <p className="comment">{props?.content}</p>
                    <span css={css`color: ${color};`} className="date">{props.createdAt}</span>
                </div>
            </div>
        </li>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    /* align-items: center; */
    height: 6.5rem;
    cursor: pointer;

    &:hover {
        background: rgba(88, 88, 88, 0.1);
    }

    figure {
        min-width: 6.5rem;
        height: 100%;
        border: 1px solid black;
    }

    figure > img {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .text-box {
        display: block;
        overflow-x: hidden;
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
    }

    .info {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
    }

    .music-info {
        .title {
            font-weight: 600;
            font-size: 1.2rem;
        }

        .singer {
            font-size: 1rem;
            font-weight: 400;
        }
    }

    .comment-info {
        p {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .date {
            font-size: 0.7rem;
        }
    }
`;

export default EvaluationMusicItem;