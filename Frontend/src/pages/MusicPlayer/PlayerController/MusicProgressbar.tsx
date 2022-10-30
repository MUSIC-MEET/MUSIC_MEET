import { css } from "@emotion/react";
import React from "react";
import BaseProps from "components/common/BaseProps";

interface MusicProgressbarProps {
    value: number;
}

function MusicProgressbar(props: BaseProps & MusicProgressbarProps) {
    return (
        <input
            className={`${props.className}`}
            css={style}
            type="range"
            max="100"
            step="1"
            defaultValue={0}
            value={props.value}
        />
    );
}

const style = css`
    cursor: pointer;
    width: 100%;
    margin: 0;
    -webkit-appearance: none;
    height: 0.45rem;
    background: red;
    &::-ms-fill-lower {
        background: red;
    }

    &::-ms-fill-upper{
        background: white;
    }
`;
export default MusicProgressbar;