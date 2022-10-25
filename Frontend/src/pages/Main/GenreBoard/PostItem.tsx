import React, { useCallback } from "react";
import Post from "pages/Main/GenreBoard/Post";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

function PostItem(props: Post & { genre: string }) {
    const navigator = useNavigate();

    const onClickHandler = useCallback(() => {
        navigator(`/board/${props.genre}/post/${props.id}`);
    }, [navigator, props.genre, props.id]);
    return (
        <li css={style} onClick={onClickHandler}>
            <span className="user">{props.user}</span>
            <span className="title">{props.title}</span>
        </li >
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    width: 100%;
    cursor: pointer;

    &:hover {
        background: rgba(88, 88, 88, 0.1);
    }

    & {
        padding: 0.5rem;
    }
    span {
        text-overflow: ellipsis;
    }
    & > .user {
        min-width: 20%;
        margin-right: 0.5rem;
    }

    & > .title {
        min-width: 60%;

    }
`;

export default PostItem;