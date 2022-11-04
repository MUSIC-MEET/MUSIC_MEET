import { css } from "@emotion/react";
import React from "react";
import BaseProps from "components/common/BaseProps";
interface MusicProgressbarProps {
    value: number;
    percent: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line react/display-name
const MusicProgressbar = (props: BaseProps & MusicProgressbarProps) => {
    return (
        <input
            className={`${props.className}`}
            css={style}
            type="range"
            step={1}
            defaultValue={0}
            min={0}
            max={props.percent}
            value={props.value}
            onChange={props.onChange}
        />

    );
};

const style = css`
    cursor: pointer;
    width: 100%;
    margin: 0;
    -webkit-appearance: none;
    height: 0.45rem;
    /* background: blue; */
    background: red;
    /* &::-ms-fill-lower, &::-moz-range-progress, &::-webkit-slider-runnable-track {
        background: red;
        border: 3px solid black;
    }
    input[type=range]::-ms-fill-upper {
        background: #d3d3d3;
    }
    &::-ms-fill-upper{
        background: white;
    }

    &::-moz-range-progress {
        background: red;
    } */
`;
export default React.memo(MusicProgressbar);