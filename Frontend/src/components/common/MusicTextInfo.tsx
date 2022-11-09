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

import VisibilityIcon from "@mui/icons-material/Visibility";
import MusicType from "Types/MusicType";

interface TextInfoProps {
    voteHandler?: () => void;
    deleteHandler?: () => void;
}

/**
 * Music 텍스트 정보들을 보여주는 컴포넌트
 * @param props.MusicType
 * @param props.voteHandler - 좋아요 버튼 클릭시 실행되는 함수
 * @param props.deleteHandler - 삭제 버튼 클릭시 실행되는 함수
 * @returns 
 */

function MusicTextInfo(props: TextInfoProps & MusicType) {
    const { t } = useTranslation<"coverViewPage">("coverViewPage");
    const { t: t2 } = useTranslation<"musicPage">("musicPage");
    const [deleteModalShown, setDeleteModalShown] = useState<boolean>(false);
    const { nickname } = useRecoilValue<{ nickname: string }>(LoginState);
    const navigator = useNavigate();
    return (
        <div css={style}>
            <h2 className="title">{props.title}</h2>
            <div className="row">
                <span className="user">{props.user ?? props.artist}</span>
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
            {
                props.genre &&
                <span className="genre">{t2("musicInfo.genre")} : {props?.genre} </span>
            }

            {
                props.releaseDate ?
                    <span className="releaseDate">{t2("musicInfo.releaseDate")} : {props?.releaseDate} </span>
                    :
                    <span className="createdat">{t("createdAt")}: {props.createdAt}</span>
            }
            <div className="counts">
                <HeartVote
                    count={props.count}
                    isVote={props.isVote}
                    onClick={props.voteHandler}
                />
                <span className="view"><VisibilityIcon />{props.view}</span>
            </div>
            {deleteModalShown &&
                <ConfirmModal
                    title={t("deleteModal.title")}
                    content={t("deleteModal.content")}
                    confirmButtonText={t("deleteModal.confirm")}
                    cancelButtonText={t("deleteModal.cancel")}
                    onConfirm={props?.deleteHandler}
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

    & > .createdat, .view, .vote, .genre {
        font-size: 0.8rem;
        color: #b2b0b0;
    }

    .view, .vote, .counts {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .view > svg{
        margin-right: 0.3rem;
    }
    .counts { 
        span {
            margin-left: 0.5rem;
        }
    }
`;

export default MusicTextInfo;