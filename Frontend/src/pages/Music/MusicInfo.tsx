import { css } from "@emotion/react";
import SectionWrapper from "components/common/SectionWrapper";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import fetchMusicInfo from "utils/RequestApis/Music/fetchMusicInfo";
import { useTranslation } from "react-i18next";
import Vote from "./Vote";
import ThemeContext from "store/ThemeContext";
import Button from "components/common/Button";

function MusicInfo({ musicNum }: { musicNum: string }) {
    const { t } = useTranslation<"musicPage">("musicPage");
    const ctx = useContext(ThemeContext);
    const { color } = ctx.themeStyle.fontStyle2;
    const [lyricsShwon, setLyricsShown] = useState<boolean>(false);
    useEffect(() => {
        //
    }, [musicNum]);

    useEffect(() => {
        setLyricsShown(false);
    }, [musicNum]);

    const { data } =
        useQuery(
            ["musicInfo", musicNum],
            () => fetchMusicInfo({ musicNum }),
            {
                retry: 0
            });



    return (
        <React.Fragment>
            <SectionWrapper style={[style, css`.sub{ color: ${color}}`]}>
                <figure>
                    <img src={data?.imgSrc} />
                </figure>
                <div className="text">
                    <span className="title">{data?.title}</span>
                    <span className="singer">{data?.singer}</span>
                    <span className="release sub">
                        {`${t("musicInfo.releaseDate")}: ${data?.releaseDate}`}
                    </span>
                    <span className="genre sub">
                        {`${t("musicInfo.genre")}: ${data?.genre}`}
                    </span>
                    <Vote
                        count={data?.vote}
                        isVote={true}
                    />
                </div>
            </SectionWrapper >
            <SectionWrapper style={lyricesStyle}>
                <h2 className="lyrics-title">{t("musicInfo.lyrics")}</h2>
                {lyricsShwon ?
                    <React.Fragment>
                        {data?.lyrics}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Button
                            value={t("musicInfo.showLyrics")}
                            onClick={() => setLyricsShown(true)}
                        />
                    </React.Fragment>
                }

            </SectionWrapper>
        </React.Fragment>
    );
}

const style = css`
    width: 80vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.4;
    figure {
        width: 10rem;
        height: 10rem;
    }

    .text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 1rem;

        .title {
            font-weight: 800;
            font-size:2.5rem;
            margin-bottom: 1.5rem;
        }

        .singer {
            font-weight: 600;
            font-size: 1.3rem;
        }

        .sub {
            font-size: 0.8rem;
        }
    }
`;

const lyricesStyle = css`
    margin-top: 0.5rem;
    width: 80vw;
    overflow-y: scroll;

    .lyrics-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
`;
export default MusicInfo;