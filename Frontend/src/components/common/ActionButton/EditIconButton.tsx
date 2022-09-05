import React from "react";
import BuildIcon from "@mui/icons-material/Build";
import { css } from "@emotion/react";
import ActionButtonPropType from "./ActionPropType";

function EditIconButton(props: ActionButtonPropType) {
    return (
        <button
            css={style}
            onClick={props.onClick}
            className={`edit-button action-button`}
        >
            <BuildIcon />
        </button>
    );
}

const style = css`
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1fb61f;
    border-radius: 3px;
    color: white;

`;
export default React.memo(EditIconButton);