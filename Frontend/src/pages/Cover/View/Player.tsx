import React, { useCallback, useMemo } from "react";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import StopCircleIcon from "@mui/icons-material/StopCircle";

function Player({ mp3Src }: { mp3Src?: string }) {
    const audio = useMemo(() => new Audio(mp3Src ?? ""), [mp3Src]);

    const playHandler = useCallback(() => {
        audio.play();
    }, [audio]);

    const stopHandler = useCallback(() => {
        audio.pause();
    }, [audio]);

    return (
        <div className="player">
            <NotStartedIcon onClick={playHandler} />
            <StopCircleIcon onClick={stopHandler} />
        </div>
    );
}

export default Player;