import { css } from "@emotion/react";
import React, { useContext } from "react";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import ThemeContext from "store/ThemeContext";
import { useTranslation } from "react-i18next";

function PlayMusicInfo() {
    const ctx = useContext(MusicPlayerContenxt);
    const ctx2 = useContext(ThemeContext);
    const { currentMusicName, currentMusicArtist, currentImage } = ctx;
    const { t } = useTranslation<"musicPlayer">("musicPlayer");
    if (currentImage === "") {
        return (
            <div css={style}>
                {t("controller.emptyMusic")}
            </div>
        );

    }

    else {
        return (
            <div css={style}>
                <figure>
                    <img src={currentImage} alt="PlayMusicImg" />
                </figure>
                <div className="music-info">
                    <h2>{currentMusicName}</h2>
                    <h3 css={css`color: ${ctx2.themeStyle.fontStyle2.color};`}>{currentMusicArtist}</h3>
                </div>
            </div>
        );
    }

}

const style = css`
    display: flex;
    flex-direction: row;
    & >  figure {
        display: flex;
        flex-direction: row;
        width: 2.5rem;
        height: 2.5rem;

        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

    & > .music-info {
        display: flex;
        flex-direction: column;
        margin-left: 0.5rem;
        justify-content: center;
        align-items: flex-start;
        line-height: 1.3;

        h2 {
            font-size: 1.2rem;
            font-weight: 600;
        }

        h3 {
            font-size: 0.9rem;
        }

    }

`;

export default PlayMusicInfo;