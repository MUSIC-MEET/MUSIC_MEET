import React, { useContext } from "react";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { css } from "@emotion/react";
function RightController() {
    const ctx = useContext(MusicPlayerContenxt);
    const { isShownContent, onChangeShownContentState } = ctx;
    return (
        <div css={style}>
            <ArrowDropUpIcon
                className={`${isShownContent ? "up" : "down"}`}
                onClick={() => onChangeShownContentState()}
            />
        </div>
    );
}

const style = css`
    svg {
        transition: 0.5s;
        cursor: pointer;
    }

    .up {
        transform: rotate(-180deg);
    }

    .down {

    }
`;

export default RightController;