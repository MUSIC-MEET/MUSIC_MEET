import { css } from "@emotion/react";
import MusicType from "Types/MusicType";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MusicItemProps {
    className?: string;
    type?: string;
}

function MusicItem(props: MusicType & MusicItemProps) {
    const navigator = useNavigate();
    return (
        <li className={`${props.className}`} css={style} onClick={() => navigator(`/${props.type}/${props.id}`)}>
            <figure>
                <img src={props.imgSrc} alt="" />
                <div className="singer-box">
                    <p className="singer">{props.artist ?? props.user}</p>
                </div>
                <div className="detail-box">
                    <p className="title">{props.title}</p>
                    <p className="singer">{props.artist ?? props.user}</p>
                </div>
            </figure>
        </li >

    );
}

const style = css`

    figure {
        width: 100%;
        height: 100%;   
        position: relative;
    }

    p {
        max-width: 100%;
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
        color: white;
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
        color: white;
    }
    &:hover {
        .detail-box {
            display: flex;
            position: absolute;
            flex-direction: column;
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

export default React.memo(MusicItem);