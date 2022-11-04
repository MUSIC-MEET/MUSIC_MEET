import React, { useCallback, useContext, useState } from "react";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import { css } from "@emotion/react";

import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface RightControllerProps {
    onChangeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isMute?: boolean;
}
/**
 * 뮤직 플레이어 우측 컨트롤러들
 * @param props.onChangeVolume - 볼륨 변경 이벤트
 * @param props.isMute - 음소거 여부
 * @returns 
 */
function RightController(props: RightControllerProps) {
    const ctx = useContext(MusicPlayerContenxt);
    const [isClickedVolume, setIsClickedVolume] = useState<boolean>(false);
    const { isShownContent, onChangeShownContentState } = ctx;

    const volumeOnClickHandler = useCallback(() => {
        setIsClickedVolume((prev) => !prev);
    }, []);

    return (
        <div css={style}>
            {
                props.isMute ?
                    <VolumeOffIcon
                        className="gray"
                    />
                    :
                    <VolumeUpIcon
                        onClick={volumeOnClickHandler}
                        className="gray"
                    />
            }
            {
                isClickedVolume &&
                <input
                    className="volume-range"
                    type="range"
                    min={0}
                    max={1}
                    defaultValue={0.3}
                    step="0.1"
                    onChange={props.onChangeVolume}
                />
            }
            <ArrowDropUpIcon
                className={`gray ${isShownContent ? "up" : "down"}`}
                onClick={() => onChangeShownContentState()}
            />
        </div>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    svg {
        transition: 0.5s;
        cursor: pointer;
        margin-left: 0.5rem;
    }

    .up {
        transform: rotate(-180deg);
    }

    .down {

    }

    .volume-range {
        width: 5rem;
        cursor: pointer;
    }
`;

export default RightController;