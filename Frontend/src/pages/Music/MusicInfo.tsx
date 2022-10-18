import { css } from "@emotion/react";
import SectionWrapper from "components/common/SectionWrapper";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fetchMusicInfo from "utils/RequestApis/Music/fetchMusicInfo";
import { useTranslation } from "react-i18next";
import ThemeContext from "store/ThemeContext";
import Button from "components/common/Button";
import vote from "utils/RequestApis/Music/vote";
import HeartVote from "components/common/HeartVote";

/**
 * 음악 페이지 음악 정보 컴포넌트
 * 음원 사진 아티스트 및 여러 정보 표시
 * @param {string} musicNum 음악 번호
 * @returns 
 */
function MusicInfo({ musicNum }: { musicNum: string }) {
    const { t } = useTranslation<"musicPage">("musicPage");
    const ctx = useContext(ThemeContext);
    const { color } = ctx.themeStyle.fontStyle2;
    const [lyricsShwon, setLyricsShown] = useState<boolean>(true);
    const queryClient = useQueryClient();
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

    const { mutate } =
        useMutation(
            ["musicVote", musicNum],
            vote,
            {
                useErrorBoundary: true,
                retry: 0,
                onSuccess: () => {
                    queryClient.invalidateQueries("musicInfo");

                }
            }
        );

    const voteOnClickHandler = useCallback(() => {
        mutate({ musicNum });
    }, [musicNum, mutate]);

    const autoResizeTextarea = () => {
        const textarea = document.querySelector(".autoTextarea");

        if (textarea) {
            const height = textarea.scrollHeight; // 높이
            textarea.classList.add(`style: ${height + 8}px`);
        }
    };

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
                    <HeartVote
                        count={data?.voteCount}
                        isVote={data?.isVote}
                        onClick={voteOnClickHandler}
                    />
                </div>
            </SectionWrapper >
            <SectionWrapper style={lyricesStyle}>
                <h2 className="lyrics-title">{t("musicInfo.lyrics")}</h2>
                {lyricsShwon ?
                    <p style={{ "whiteSpace": "pre-wrap", "lineHeight": "1.3" }}>
                        {`${data?.lyrics}`}
                    </p>
                    :
                    <React.Fragment>
                        <Button
                            value={t("musicInfo.showLyrics")}
                            onClick={() => setLyricsShown(true)}
                        />
                    </React.Fragment>
                }

            </SectionWrapper >
        </React.Fragment >
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.4;
    width: 80vw;
    figure {
        width: 10rem;
        height: 10rem;
    }

    figure > img {
        width: 100%;
        width: 100%;
        object-fit: fill;
    }

    & > textarea {
        border: none;
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
    overflow-y: scroll;

    .lyrics-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
`;
export default MusicInfo;