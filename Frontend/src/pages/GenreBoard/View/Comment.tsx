import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import CommentType from "./CommentType";
import DeleteIconButton from "components/common/ActionButton/DeleteIconButton";
import EditIconButton from "components/common/ActionButton/EditIconButton";
import ReportIconButton from "components/common/ActionButton/ReportIconButton";
import UpVoteButton from "components/common/VoteButton/UpVoteButton";
import DownVoteButton from "components/common/VoteButton/DownVoteButton";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

interface HandlerType {
    voteHandler: ({ type, commentNum }: { type: "upvote" | "downvote", commentNum: string }) => void;
}

function Comment(props: CommentType & HandlerType) {
    const { commentNum, comment, nickname, createdAt, upvote, downvote, userImage } = props;
    const { voteHandler } = props;
    const { nickname: loginNickname } = useRecoilValue<{ nickname: string }>(LoginState);
    return (
        <li css={style}>
            <CommentTop>
                <div className="writer-profile comment-wrapper">
                    <img src={userImage} alt={nickname} />
                    <span className="nickname">{nickname}</span>
                    <p className="createdAt">{createdAt}</p>
                </div>
                <div className="more-actions comment-wrapper">
                    {
                        loginNickname === nickname ?
                            <React.Fragment>
                                <EditIconButton
                                    onClick={() => {/* TODO */ }}
                                />
                                <DeleteIconButton
                                    onClick={() => {/* TODO */ }}
                                />
                            </React.Fragment>
                            :
                            <ReportIconButton
                                onClick={() => {/* TODO */ }}
                            />
                    }
                </div>
            </CommentTop>
            <CommentBody>
                <p>{comment}</p>
                <div className="votes comment-wrapper">
                    <UpVoteButton
                        onClick={() => { voteHandler({ type: "upvote", commentNum }); }}
                        value={upvote}
                    />
                    <DownVoteButton
                        onClick={() => { voteHandler({ type: "downvote", commentNum }); }}
                        value={downvote}
                    />
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

        .action-button {
            width: 1.8rem;
            height: 1.8rem;
            margin-left: 0.5rem;
        }
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

    .vote {
        width: 3rem;
        height: 2.5rem;
        .vote-icon {
            margin-right: 0.3rem;
        }
    }
    
`);

export default React.memo(Comment);