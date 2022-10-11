import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import DeleteIconButton from "components/common/ActionButton/DeleteIconButton";
import EditIconButton from "components/common/ActionButton/EditIconButton";
import ReportIconButton from "components/common/ActionButton/ReportIconButton";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
import CommentType from "./CommentType";


interface ActionHandlerType {
    onDelete: (commentNum: string | number) => void;
    onEdit: (commentNum: string | number, newComment: string) => void;
}

/**
 * comment Item Component
 * @param props CommentType
 * @returns 
 */
function Comment(props: CommentType & ActionHandlerType) {
    const { nickname: loginNickname } = useRecoilValue<{ nickname: string }>(LoginState);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>(props.comment ?? "");
    const { t } = useTranslation<"genreBoardViewer">("genreBoardViewer");

    const changEditMode = useCallback(() => {
        setIsEditMode(() => !isEditMode);
    }, [isEditMode]);

    const newCommentChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(() => e.target.value);
    }, []);

    const editCommentHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newComment.length === 0) return;
        props.onEdit(props.id ?? "", newComment);
        changEditMode();
    }, [changEditMode, newComment, props]);

    return (
        <li css={style}>
            <CommentTop>
                <div className="writer-profile comment-wrapper">
                    <img src={props.imgSrc} alt={"img"} />
                    <span className="nickname">{props.user}</span>
                    <p className="createdAt">{props.createdAt}</p>
                </div>
                <div className="more-actions comment-wrapper">
                    {
                        loginNickname === props.user ?
                            <React.Fragment>
                                <EditIconButton
                                    onClick={changEditMode}
                                />
                                <DeleteIconButton
                                    onClick={() => props.onDelete(props.id ?? "")}
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
                {isEditMode ?
                    <React.Fragment>
                        <Form
                            onSubmit={editCommentHandler}
                            direction="row"
                        >
                            <Input
                                input={{
                                    value: newComment,
                                    onChange: newCommentChangeHandler,
                                }}
                            />
                            <Submit value={t("comment.edit.submit")} />
                        </Form>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <p>{props.comment}</p>
                    </React.Fragment>
                }
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

    & > form {
        width: 100%;
    }
    & > form > input {
        margin-right: 0.5rem;
        flex: 9;
        height: 2.5rem;
    }

    & > form > input[type="submit"] {
        flex: 1;
    }
    
`);

export default React.memo(Comment);