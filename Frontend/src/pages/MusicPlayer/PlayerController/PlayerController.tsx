import { css } from "@emotion/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import MusicProgressbar from "./MusicProgressbar";
import RightController from "./RightController";
import PlayMusicInfo from "./PlayMusicInfo";
import ThemeContext from "store/ThemeContext";
import { cleanup } from "@testing-library/react";

interface PlayerControllerProps {
    playingMusic: string;
    prev: () => void;
    next: () => void;
}

function PlayerController(props: PlayerControllerProps) {
    useEffect(() => {
        console.log(props.playingMusic);
        const audio = new Audio(props.playingMusic);
        audio.play();
        return () => {
            audio.pause();
        };
    }, [props.playingMusic]);
    const ctx = useContext(ThemeContext);
    return (
        <section css={[style, css`background: ${ctx.themeStyle.musicPlayer.background};`]}>
            <MusicProgressbar />
            <div className="button-controller">
                <div>
                    <button className="prev" onClick={() => props.prev()}>이전</button>
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