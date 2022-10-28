import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import PlayerContent from "./PlayerContent/PlayerContent";
import PlayerController from "./PlayerController/PlayerController";

interface MusicPlayerProps {
    className?: string;
}

function MusicPlayer(props: MusicPlayerProps) {
    const [shownPlayerContent, setShownPlayerContent] = useState<boolean>(true);
    const changeShwonStateHandler = useCallback(() => {
        setShownPlayerContent((prev) => !prev);
    }, []);
    return (
        <MusicPlayerContenxt.Provider value={{
            isShownContent: shownPlayerContent,
            onChangeShownContentState: changeShwonStateHandler
        }}>
            <article className={`${props.className}`} css={root}>
                <PlayerContent
                    className={`${shownPlayerContent ? "shown" : "hidden"}`}
                />
                <PlayerController

                />
            </article>
        </MusicPlayerContenxt.Provider >


    );
}

const root = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    z-index: 2000;
    .shown {
        height: 100vh;
    }

    .hidden {
        height: 0;
    }
`;



export default MusicPlayer;