import React from "react";
import VoteButtonPropType from "./VoteButtonPropType";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { css } from "@emotion/react";

function UpVoteButton(props: VoteButtonPropType) {
    return (
        <button
            css={style}
            className={`upvote vote ${props.className}`}
            onClick={() => props.onClick("upvote")}
        >
            <ThumbUpAltIcon className="vote-icon" />
            {props.value}
        </button>
    );
}

const style = css`
    all: unset;
    cursor: pointer;    
    display: flex;
    flex-direction: ;
    justify-content: center;
    align-items: center;
    margin-left : 1rem;
    color: white;
    border-radius: 3px;
    background-color: #b3301f;
`;

export default React.memo(UpVoteButton);