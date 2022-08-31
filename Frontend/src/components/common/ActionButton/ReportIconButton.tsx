import React from "react";
import { css } from "@emotion/react";
import ActionButtonPropType from "./ActionPropType";
import ReportIcon from "@mui/icons-material/Report";


function ReportIconButton(props: ActionButtonPropType) {
    return (
        <button
            css={style}
            onClick={props.onClick}
            className={`report-button action-button`}
        >
            <ReportIcon />
        </button>
    );
}

const style = css`
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    border-radius: 3px;

`;
export default React.memo(ReportIconButton);