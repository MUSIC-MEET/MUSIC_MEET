import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { css } from "@emotion/react";

interface HeartVoteProps {
    count?: string;
    isVote?: boolean;
    onClick?: () => void;
}

/**
 * 음악 페이지 좋아요 컴포넌트
 * @param props 
 * @params {string} count 좋아요 수
 * @params {boolean} isVote 좋아요 여부
 * @returns 
 */
function HeartVote(props: HeartVoteProps) {
    const { count, isVote, onClick } = props;
    console.log(isVote);
    return (
        <div css={style} onClick={onClick}>
            {isVote ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <p className="vote">{count}</p>
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

export default HeartVote;