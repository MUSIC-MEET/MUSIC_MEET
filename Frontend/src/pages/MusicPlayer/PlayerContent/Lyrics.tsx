import { css } from "@emotion/react";
import React from "react";

interface LyricsProps {
    lyrics?: string;
}

function Lyrics(props: LyricsProps) {
    return (
        <div css={style}>
            <p>
                {props?.lyrics}
            </p>
        </div>
    );
}

const style = css`
    padding-bottom: 0.5rem;

    p {
        white-space: pre;
        line-height: 1.5;
        text-align: center;
    }
`;

export default Lyrics;