import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { PostType } from "./PostType";
import { useNavigate, useParams } from "react-router-dom";

function Post(props: PostType) {
    const params = useParams<{ genre: string }>();
    const genre = params.genre ?? "kpop";
    const { boardNum, title, user, createdAt, view, vote } = useMemo(() => props, [props]);
    const navigator = useNavigate();

    const onClickHandler = () => {
        navigator(`/board/${genre}/post/${boardNum}`);
    };

    return (
        <tr className={`wrap`} css={_style} onClick={onClickHandler}>
            <td className="num">{boardNum}</td>
            <td className="title">{title}</td>
            <td className="writer">{user}</td>
            <td className="time">{createdAt}</td>
            <td className="view">{view}</td>
            <td className="vote">{vote}</td>
        </tr>
    );
}

const _style = css`
    cursor: pointer;
    text-align: center;
    width: 100%;
    height: 36px;
    border-bottom: 0.2px solid #5b5b5b;
    & {
        padding-left: 0.5rem;
    }
    &:hover {
        background: rgba(88, 88, 88, 0.1);
    }
`;

export default Post;