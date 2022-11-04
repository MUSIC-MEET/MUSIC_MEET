import { css } from "@emotion/react";
import React, { useContext } from "react";
import BaseProps from "components/common/BaseProps";
import styled from "@emotion/styled";
import ThemeContext from "store/ThemeContext";
import PlayMusicImg from "./PlayMusicImg";

interface PlayerContentProps {
    playList?: any
}

function PlayerContent(props: BaseProps & PlayerContentProps) {
    const ctx = useContext(ThemeContext);

    return (
        <Section
            className={`fullsize-music-player ${props.className}`}
            background={ctx.themeStyle.musicPlayer.content.background}
        >
            <PlayMusicImg
                className="content-left content-item"
            />
            <div className="right content-item">2</div>
        </Section>
    );
}

const Section = styled.section<{ background: string }>`
    width: 100%;
    display: flex;
    flex-direction: row;
    background: ${props => props.background};
    transition: all 0.5s ease-in;
    & > .content-item {
        width: 100%;
    }
`;



export default PlayerContent;