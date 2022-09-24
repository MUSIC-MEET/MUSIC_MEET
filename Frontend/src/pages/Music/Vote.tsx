import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { css } from "@emotion/react";

interface VoteProps {
    count?: string;
    isVote?: boolean;
    onClick?: () => void;
}

function Vote(props: VoteProps) {
    const { count, isVote, onClick } = props;
    return (
        <div css={style} onClick={onClick}>
            {isVote ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <p>{count}</p>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.2rem;
    p {
        margin-left: 0.2rem
    }

    svg {
        font-size: 1.5rem;
        color: red;
    }
`;

export default Vote;