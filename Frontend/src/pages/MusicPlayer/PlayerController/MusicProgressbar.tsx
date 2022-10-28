import { css } from "@emotion/react";
import React from "react";
import BaseProps from "components/common/BaseProps";

function MusicProgressbar(props: BaseProps) {
    return (
        <input
            className={`${props.className}`}
            css={style}
            type="range"
            max="100"
            step="1"
        />
    );
}

const style = css`
    width: 100%;
    margin: 0;
`;
export default MusicProgressbar;