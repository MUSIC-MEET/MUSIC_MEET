import { css } from "@emotion/react";
import SectionWrapper from "components/common/SectionWrapper";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fetchMusicInfo from "utils/RequestApis/Music/fetchMusicInfo";
import { useTranslation } from "react-i18next";
import ThemeContext from "store/ThemeContext";
import Button from "components/common/Button";
import vote from "utils/RequestApis/Music/vote";
import MusicDefaultInfo from "components/common/MusicDefaultInfo";

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

    return (
        <React.Fragment>
            <MusicDefaultInfo
                {...data}
                voteHandler={voteOnClickHandler}
            />
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


const lyricesStyle = css`
    overflow-y: scroll;

    .lyrics-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
`;
export default MusicInfo;