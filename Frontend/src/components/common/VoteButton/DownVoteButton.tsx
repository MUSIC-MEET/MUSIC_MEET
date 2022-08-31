import React from "react";
import VoteButtonPropType from "./VoteButtonPropType";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { css } from "@emotion/react";

function DownVoteButton(props: VoteButtonPropType) {
    return (
        <button
            css={style}
            className={`upvote vote ${props.className}`}
            onClick={() => props.onClick("downvote")}
        >
            <ThumbDownAltIcon className="vote-icon" />
            {props.value}
        </button>
    );
}

const style = css`
    all: unset;
    cursor: pointer;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left : 1rem;
    color: white;
    border-radius: 3px;
    background-color: #3f51b5;
`;

export default React.memo(DownVoteButton);