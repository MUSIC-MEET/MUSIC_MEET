import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { css } from "@emotion/react";
function Vote({ count, isVote }: { count?: string; isVote: boolean; }) {
    return (
        <div css={style}>
            {isVote ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <p>{count}</p>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        margin-left: 0.2rem
    }
`;

export default Vote;