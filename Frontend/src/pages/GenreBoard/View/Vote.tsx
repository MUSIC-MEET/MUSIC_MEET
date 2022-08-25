import { css } from "@emotion/react";
import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function Vote() {
    return (
        <section css={style}>
            <button className="upvote vote">
                <ThumbUpAltIcon className="vote-icon" />
                <span>1</span>
            </button>
            <button className="downvote vote">
                <ThumbDownAltIcon className="vote-icon" />
                <span>2</span>
            </button>
        </section>
    );
}

const style = css`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .vote-icon {
        margin-right: 0.3rem;
    }

    .vote {
        all: unset;
        cursor: pointer;    
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.5rem;
        height: 2.5rem;
        margin-left : 1rem;
        color: white;
        border-radius: 3px;
    }

    .upvote {
        background-color: #b3301f;
    }

    .downvote {
        background-color: #3f51b5;
    }
`;


export default React.memo(Vote);