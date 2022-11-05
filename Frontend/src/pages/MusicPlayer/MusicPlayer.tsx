import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import PlayListMusicType from "Types/PlayListMusicType";
import fetchPlayList from "utils/RequestApis/MusicPlayer/fetchPlayList";
import PlayerContent from "./PlayerContent/PlayerContent";
import PlayerController from "./PlayerController/PlayerController";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

interface MusicPlayerProps {
    className?: string;
}

function MusicPlayer(props: MusicPlayerProps) {
    const { nickname } = useRecoilValue<{ nickname: string }>(LoginState);
    const { data } = useQuery(["fetchMusicPlayList", nickname], () => fetchPlayList(), {
        suspense: true,
        useErrorBoundary: false,
    });
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [shownPlayerContent, setShownPlayerContent] = useState<boolean>(false);
    const changeShwonStateHandler = useCallback(() => {
        setShownPlayerContent((prev) => !prev);
    }, []);

    const prevHandler = useCallback(() => {
        setCurrentIndex((prev) => prev > 0 ? prev - 1 : 0);
    }, []);

    const nextHandler = useCallback(() => {
        setCurrentIndex((prev) => prev < data!.length - 1 ? prev + 1 : data!.length - 1);
    }, [data]);

    return (
        <MusicPlayerContenxt.Provider value={{
            isShownContent: shownPlayerContent,
            onChangeShownContentState: changeShwonStateHandler,
            currentImage: data![currentIndex]?.imgSrc ?? "",
            currentLyrics: data![currentIndex]?.lyrics ?? "",
            currentMusicName: data![currentIndex]?.title ?? "",
            currentMusicArtist: data![currentIndex]?.artist ?? "",
            playList: data ?? [],
            currentMusicIndex: currentIndex,
        }}>
            <article className={`${props.className}`} css={root}>
                <PlayerContent
                    className={`${shownPlayerContent ? "shown" : "hidden"} player-content`}
                />
                <PlayerController
                    className={"player-controller"}
                    playingMusic={data![currentIndex]?.mp3File}
                    prev={prevHandler}
                    next={nextHandler}
                />
            </article>
        </MusicPlayerContenxt.Provider >
    );

}

const root = css`

        display: flex;
        /* flex-wrap: wrap; */
        flex-direction: column;
        width: 100%;
        height: 100%;
        .shown {
            /* height: calc(100%);  */
            height: 100%;
        }

        .hidden {
            height: 0;
            overflow: hidden;
        }

        & > .player-content {
            position: fixed;
            padding-bottom: 5rem;
            bottom: 0;
            z-index: 2000;
        }

        & > .player-controller {
            position: fixed;
            bottom: 0;
            max-height: 5rem;
            z-index: 2000;
        }
    `;



export default React.memo(MusicPlayer);