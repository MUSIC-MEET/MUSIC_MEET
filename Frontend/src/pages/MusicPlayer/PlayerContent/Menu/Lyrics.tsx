import { css } from "@emotion/react";
import React from "react";

interface LyricsProps {
    lyrics?: string;
}

function Lyrics(props: LyricsProps) {
    return (
        <React.Fragment>
            <p css={style} className={`lyrics`}>
                {props?.lyrics}
            </p>
        </React.Fragment>
    );
}

const style = css`
    p {
        white-space: pre;
        text-align: center;
        margin: none;
        display: inline-flex; 
    }
`;

export default Lyrics;