import React from "react";

interface LyricsProps {
    lyrics?: string;
}

function Lyrics(props: LyricsProps) {
    return (
        <p style={{ "whiteSpace": "pre-wrap" }}>
            {props.lyrics}
        </p>
    );
}

export default Lyrics;