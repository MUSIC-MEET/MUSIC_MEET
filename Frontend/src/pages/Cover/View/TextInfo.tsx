import { css } from "@emotion/react";
import ConfirmModal from "components/AlertModal/ConfirmModal";
import DeleteIconButton from "components/common/ActionButton/DeleteIconButton";
import EditIconButton from "components/common/ActionButton/EditIconButton";
import HeartVote from "components/common/HeartVote";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";


interface TextInfoProps {
    id?: number | string;
    title?: string;
    user?: string;
    createdAt?: string;
    isVote?: boolean;
    count?: string;
    vote: () => void;
    delete: () => void;
}

/**
 * 커버 뷰 페이지 텍스트 정보들을 보여주는 컴포넌트
 * @param props.title - title
 * @param props.user - user
 * @param props.createdAt - createdAt
 * @param props.isVote - isVote
 * @param props.voteCount - voteCount
 * @param props.vote - vote
 * @param props.delete - delete
 * @returns 
 */

function TextInfo(props: TextInfoProps) {
    const { t } = useTranslation<"coverViewPage">("coverViewPage");
    const [deleteModalShown, setDeleteModalShown] = useState<boolean>(false);
    const { nickname } = useRecoilValue<{ nickname: string }>(LoginState);
    const navigator = useNavigate();
    return (
        <div css={style}>
            <h2 className="title">{props.title}</h2>
            <div className="row">
                <span className="user">{props.user}</span>
                {
                    props.user === nickname &&
                    <React.Fragment>
                        <EditIconButton
                            onClick={() => navigator(`/cover/edit/${props.id}`)}
                        />
                        <DeleteIconButton
                            onClick={() => setDeleteModalShown(() => true)}
                        />
                    </React.Fragment>

                }
            </div>

            <span className="createdat">{t("createdAt")}: {props.createdAt}</span>
            <HeartVote
                count={props.count}
                isVote={props.isVote}
                onClick={props.vote}
            />
            {deleteModalShown &&
                <ConfirmModal
                    title={t("deleteModal.title")}
                    content={t("deleteModal.content")}
                    confirmButtonText={t("deleteModal.confirm")}
                    cancelButtonText={t("deleteModal.cancel")}
                    onConfirm={props.delete}
                    onCancel={() => setDeleteModalShown(() => false)}
                    onClose={() => setDeleteModalShown(() => false)}
                />
            }
        </div>
    );
}

const style = css`
    line-height: 1.5;
    margin-left: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    overflow: hidden;
    & > h2 {
        font-weight: 800;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }

    & > h2, span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .row {
        display: flex;
        flex-direction: row;
        .user {
            font-weight: 600;
            font-size: 1.3rem;
        }
        .delete-button, .edit-button {
            margin-left: 0.2rem;
            font-size: 0.5rem;
            transform: scale(0.7);
        }

    }

    & > .createdat {
        font-size: 0.8rem;
        color: #b2b0b0;
    }
`;

export default TextInfo;