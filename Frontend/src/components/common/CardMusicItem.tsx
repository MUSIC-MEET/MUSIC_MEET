import React, { useContext } from "react";
import MusicType from "Types/MusicType";
import { css } from "@emotion/react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ThemeContext from "store/ThemeContext";
import { useNavigate } from "react-router-dom";
interface CardMusicItemProps {
    className?: string;
    type: "cover" | "music";
}

function CardMusicItem(props: CardMusicItemProps & MusicType) {
    const ctx = useContext(ThemeContext);
    const { color } = ctx.themeStyle.fontStyle2;
    const navigator = useNavigate();
    return (
        <li
            className={`${props.className}`}
            css={style}
            onClick={() => navigator(`/${props.type}/${props.id}`)}
        >
            <figure className={"img"}>
                <img src={props.imgSrc} alt={props.title} />
            </figure>
            <div className="info">
                <h3 className="title">{props.title}</h3>
                <span className="user">{props?.user ?? props.artist}</span>
                <div className="sub" style={{ color: color }}>
                    <span className="date">{props.createdAt ?? props.releaseDate}</span>
                    <div className="counts">
                        <span className="vote"><FavoriteIcon />{props.count}</span>
                        <span className="view"><VisibilityIcon />{props.view}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    cursor: pointer;
    
    &:hover {
        background: rgba(88, 88, 88, 0.1);
}
    & > figure > img { 
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    & > .img {
        width: 12rem;
        height: 12rem;
        margin-right: 0.8rem;
    }

    & > .info {
        line-height: 1.2;
    }
    & > .info > .title {
        font-size: 1.5rem;
        font-weight: 800;
    }
    
    & > .info > .user {
        font-size: 1.2rem;
        font-weight: 400;
    }
    & > .info > .sub {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 0.9rem;
        margin-top: 0.8rem;
    }

    & > .info > .sub > span, .counts > span  {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 0.5rem;
    }

    .counts {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    svg {
        width: 1.2rem;
        margin-right: 0.2rem;
    }

    .vote > svg {
        color: red;
    }
`;

export default React.memo(CardMusicItem);