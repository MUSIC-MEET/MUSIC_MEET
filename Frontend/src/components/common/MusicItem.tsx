import { css } from "@emotion/react";
import React from "react";

interface MusicItemProps {
    className?: string;
    imgSrc?: string;
    title?: string;
    singer?: string;
}

function MusicItem(props: MusicItemProps) {
    return (
        <li css={style}>
            <figure className={`${props.className} container `}>
                <img src={props.imgSrc} alt="" />
                <div className="singer-box">
                    <p className="singer">{props.singer}</p>
                </div>
                <div className="detail-box">
                    <p className="title">{props.title}</p>
                    <p className="singer">{props.singer}</p>
                </div>
            </figure>
        </li>

    );
}

const style = css`
    figure {
        position: relative;
    }

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    p.singer {
        font-size: 0.6rem;
    }

    p.title {
        font-size: 0.8rem;
    }

    img { 
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    .singer-box {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20%;
        
    }

    .detail-box {
        z-index: 5;
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    &:hover {
        .detail-box {
            display: flex;
            position: absolute;
            flex-direction:  column;
            top: 0;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            line-height: 1.5;
        }


        .singer-box {
            display: none;
        }
    }

`;

export default MusicItem;