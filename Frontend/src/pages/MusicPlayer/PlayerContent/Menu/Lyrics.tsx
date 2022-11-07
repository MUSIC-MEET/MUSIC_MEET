import { css } from "@emotion/react";
import React from "react";

interface LyricsProps {
    lyrics?: string;
}

function Lyrics(props: LyricsProps) {
    return (
        <div css={style}>
            <p className={`lyrics`}>
                {props?.lyrics}
            </p>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
    p {
        white-space: pre;
        text-align: center;
        margin: none;
        display: inline-flex; 
    }
`;

export default Lyrics;