import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import CommentType from "./CommentType";

function Comment(props: CommentType) {
    const { commentNum, comment, nickname, createdAt, upvote, downvote, userImage } = props;
    return (
        <li css={style}>
            <CommentTop>
                <div className="writer-profile comment-wrapper">
                    <img src={userImage} alt={nickname} />
                    <span className="nickname">{nickname}</span>
                    <p className="createdAt">{createdAt}</p>
                </div>
                <div className="more-actions comment-wrapper">
                    <span>수정</span>
                    <span>삭제</span>
                    <span>신고</span>
                </div>
            </CommentTop>
            <CommentBody>
                <p>{comment}</p>
                <div className="votes comment-wrapper">
                    {upvote}
                    {downvote}
                </div>
            </CommentBody>
        </li>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #4a4a4a;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    .comment-wrapper {
        display: flex;
        flex-direction: row;
    }
`;

const CommentTop = React.memo(styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    justify-content: space-between;

    .writer-profile {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & > * {
            margin-right: 0.5rem;
        }

        & > .nickname {
            font-weight: 800;
        }

        & > .createdAt {
            font-size: 0.8rem;
        }

        & > img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
        }
    }
`);

const CommentBody = React.memo(styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`);

export default React.memo(Comment);