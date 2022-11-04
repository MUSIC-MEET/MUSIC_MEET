
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import MusicProgressbar from "./MusicProgressbar";
import RightController from "./RightController";
import PlayMusicInfo from "./PlayMusicInfo";
import ThemeContext from "store/ThemeContext";
import BaseProps from "components/common/BaseProps";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import styled from "@emotion/styled";


interface PlayerControllerProps {
    audio?: HTMLAudioElement;
    playingMusic?: string;
    prev: () => void;
    next: () => void;
}

function PlayerController(props: PlayerControllerProps & BaseProps) {
    const PERCENT = useMemo(() => 1000, []);
    const ctx = useContext(ThemeContext);
    const audio = useMemo(() => new Audio(props?.playingMusic), [props.playingMusic]);
    const [progress, setProgress] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.3);
    useEffect(() => {
        audio.volume = volume;
        audio.play();
        audio?.addEventListener("ended", () => {
            props.next();
        });

        audio.addEventListener("timeupdate", (e: any) => {
            console.log("aa");
            const audio = e.target as HTMLAudioElement;
            const percent = audio.currentTime / audio.duration * PERCENT;
            setProgress(() => percent);
        });

        // audio.volume = 0.1;
        return () => {
            audio?.pause();
            setProgress(0);
        };
    }, [PERCENT, audio, props, volume]);


    const changeProgressHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        audio.currentTime = value * audio.duration / PERCENT;
        setProgress(() => value);
    }, [PERCENT, audio]);

    const onPlaying = useCallback(() => {
        audio?.play();
        setIsPlaying(() => true);
    }, [audio]);

    const onPause = useCallback(() => {
        audio?.pause();
        setIsPlaying(() => false);
    }, [audio]);

    const onPrev = useCallback(() => {
        props.prev();
        setIsPlaying(() => true);
    }, [props]);

    const onNext = useCallback(() => {
        props.next();
        setIsPlaying(() => true);
    }, [props]);

    const onChangeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value);
        setVolume(() => Number(e.target.value));
    }, [audio]);

    const isMute = useMemo(() => audio.volume === 0, [audio.volume]);
    const transTime = useCallback((mlisecond: number) => {
        const minute = Math.floor(mlisecond / 60);
        const second = Math.floor(mlisecond % 60);
        return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
    }, []);

    const getCurrentMusicTime = useCallback(() => {
        // eslint-disable-next-line max-len
        return `${transTime(audio.currentTime)} : ${audio.duration ? transTime(audio.duration) : transTime(audio.currentTime)}`;
    }, [audio.currentTime, audio.duration, transTime]);
    return (
        <Section
            className={`${props?.className}`}
            background={ctx.themeStyle.musicPlayer.player.background}
            gray={ctx.themeStyle.musicPlayer.player.gray}
        >
            <MusicProgressbar
                value={progress}
                percent={PERCENT}
                onChange={changeProgressHandler}
            />
            <div className="button-controller">
                <div className="controls">
                    <button className="prev" onClick={onPrev}><SkipPreviousIcon /></button>
                    {isPlaying ?
                        <button className="pause" onClick={onPause}><PauseIcon /></button> :
                        <button className="play" onClick={onPlaying}><PlayArrowIcon /></button>
                    }
                    <button className="next" onClick={onNext}><SkipNextIcon /></button>
                    <span className="gray elapsed-time">
                        {`${getCurrentMusicTime()}`}
                    </span>
                </div>
                <PlayMusicInfo />
                <RightController
                    onChangeVolume={onChangeVolume}
                    isMute={isMute}
                />
            </div>
        </Section >
    );
}

const Section = styled.section<{ background: string; gray: string; }>`
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.background};
    .button-controller {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        margin-top: 0.5rem;

        .controls {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            button {
                all: unset;
                cursor: pointer;
            }
        }
    }

    .gray {
        color: ${props => props.gray};
    }

    .elapsed-time {
        font-size: 0.7rem;
        margin-left: 0.5rem;
    }
`;

export default PlayerController;