import React, { useContext } from "react";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import { css } from "@emotion/react";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function RightController() {
    const ctx = useContext(MusicPlayerContenxt);
    const { isShownContent, onChangeShownContentState } = ctx;
    return (
        <div css={style}>
            <VolumeUpIcon className="gray" />
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
`;

export default RightController;