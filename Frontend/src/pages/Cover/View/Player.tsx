import React, { useCallback, useEffect, useMemo, useState } from "react";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";


/**
 * 커버 뷰 페이지 플레이어 컴포넌트
 * @params obj.mp3Src - mp3 파일 경로
 */
function Player({ mp3Src }: { mp3Src?: string }) {
    const audio = useMemo(() => new Audio(mp3Src ?? ""), [mp3Src]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    useEffect(() => {
        //
    }, []);
    const playHandler = useCallback(() => {
        audio.play();
        setIsPlaying(() => true);
    }, [audio]);

    const stopHandler = useCallback(() => {
        audio.pause();
        setIsPlaying(() => false);
    }, [audio]);

    const resetHandler = useCallback(() => {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(() => false);
    }, [audio]);
    return (
        <div className="player">
            {isPlaying ?
                <PauseCircleIcon onClick={stopHandler} />
                :
                <NotStartedIcon onClick={playHandler} />
            }
            <StopCircleIcon onClick={resetHandler} />
        </div>
    );
}

export default Player;