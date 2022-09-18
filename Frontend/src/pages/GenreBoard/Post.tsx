import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { PostType } from "./PostType";
import { useNavigate, useParams } from "react-router-dom";
interface PostProps {
    style?: string;
}

function Post(props: PostType & PostProps) {
    const params = useParams<{ genre: string }>();
    const genre = params.genre ?? "kpop";
    const { boardNum, title, nickname, createdAt, view, vote, style } = useMemo(() => props, [props]);
    const navigator = useNavigate();

    const onClickHandler = () => {
        navigator(`/board/${genre}/post/${boardNum}`);
    };

    return (
        <div className={`wrap`} css={[_style, style]} onClick={onClickHandler}>
            <span className="num">{boardNum}</span>
            <span className="title">{title}</span>
            <span className="writer">{nickname}</span>
            <span className="time">{createdAt}</span>
            <span className="view">{view}</span>
            <span className="vote">{vote}</span>
        </div>
    );
}

const _style = css`
    cursor: pointer;
    text-align: center;
    height: 2.5rem;
    border-bottom: 0.2px solid #5b5b5b;
    &:hover {
        background: rgba(88, 88, 88, 0.1);
    }
`;

export default Post;