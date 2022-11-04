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
    padding: 0.5rem;
    p {
        white-space: pre;
    }
`;

export default Lyrics;