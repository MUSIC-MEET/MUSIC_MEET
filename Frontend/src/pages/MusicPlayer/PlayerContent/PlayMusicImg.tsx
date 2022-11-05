import React, { useContext } from "react";
import BaseProps from "components/common/BaseProps";
import { css } from "@emotion/react";
import MusicPlayerContenxt from "store/MusicPlayerContext";

function PlayMusicImg(props: BaseProps) {
    const ctx = useContext(MusicPlayerContenxt);
    const { currentImage } = ctx;
    return (
        <div
            className={`${props?.className}`}
            css={style}
        >
            <figure>
                <img src={currentImage} alt="PlayMusicImg" />
            </figure>
        </div>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > figure {
        width: 20rem;
        height: 20rem;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
            border-radius: 3%;
            
        }
    }
`;

export default PlayMusicImg;