import { css } from "@emotion/react";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import MusicProgressbar from "./MusicProgressbar";
import RightController from "./RightController";
import PlayMusicInfo from "./PlayMusicInfo";
import ThemeContext from "store/ThemeContext";

interface PlayerControllerProps {
    playingMusic: string;
    prev: () => void;
    next: () => void;
}

function PlayerController(props: PlayerControllerProps) {
    const ctx = useContext(ThemeContext);
    const audio = useMemo(() => new Audio(props.playingMusic), [props.playingMusic]);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        audio.play();
        const timer = setInterval(() => {
            setProgress(() => Math.floor(audio.currentTime) / Math.floor(audio.duration) * 100);
        }, 1000);
        return () => {
            audio?.pause();
            setProgress(0);
            clearInterval(timer);
        };
    }, [audio, props.playingMusic]);


    const changeProgressHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setProgress(value);
        audio.currentTime = value * audio.duration / 100;
    }, [audio]);

    return (
        <section css={[style, css`background: ${ctx.themeStyle.musicPlayer.background};`]}>
            <MusicProgressbar
                value={progress}
                oncChange={changeProgressHandler}
            />
            <div className="button-controller">
                <div>
                    <button className="prev" onClick={() => props.prev()}>이전</button>
                    <button className="prev" onClick={() => audio.play()}>이전</button>
                    <button className="play" onClick={() => props.next()}>다음</button>
                </div>
                <div className="item">1</div>
                <PlayMusicInfo />
                <RightController />
            </div>

        </section >
    );
}

const style = css`
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;

    .button-controller {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        margin-top: 0.5rem;
    }
`;

export default PlayerController;