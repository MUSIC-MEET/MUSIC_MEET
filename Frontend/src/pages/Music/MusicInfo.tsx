import { css } from "@emotion/react";
import SectionWrapper from "components/common/SectionWrapper";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import fetchMusicInfo from "utils/RequestApis/Music/fetchMusicInfo";
import { useTranslation } from "react-i18next";
import Vote from "./Vote";

function MusicInfo({ musicNum }: { musicNum: string }) {
    const { t } = useTranslation<"musicPage">("musicPage");
    useEffect(() => {
        //
    }, [musicNum]);

    const { data } =
        useQuery(
            ["musicInfo", musicNum],
            () => fetchMusicInfo({ musicNum }),
            {
                retry: 0
            });
    return (
        <SectionWrapper style={style}>
            <figure>
                <img src={data?.imgSrc} />
            </figure>
            <div className="text">
                <span className="title">{data?.title}</span>
                <span className="singer">{data?.singer}</span>
                <span className="release small">
                    {`${t("musicInfo.releaseDate")}: ${data?.releaseDate}`}
                </span>
                <span className="genre small">
                    {`${t("musicInfo.genre")}: ${data?.genre}`}
                </span>
                <Vote
                    count={data?.vote}
                    isVote={false}
                />
            </div>

        </SectionWrapper >
    );
}

const style = css`
    width: 80vw;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.2;
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

        .small {
            font-size: 0.8rem;
        }
    }
`;

export default MusicInfo;