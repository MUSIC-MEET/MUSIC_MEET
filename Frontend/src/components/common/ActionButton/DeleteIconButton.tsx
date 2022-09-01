import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { css } from "@emotion/react";
import ActionButtonPropType from "./ActionPropType";

function DeleteIconButton(props: ActionButtonPropType) {
    return (
        <button
            css={style}
            onClick={props.onClick}
            className={`delete-button action-button`}
        >
            <DeleteForeverIcon />
        </button>
    );
}

const style = css`
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b3301f;
    border-radius: 3px;

`;
export default React.memo(DeleteIconButton);