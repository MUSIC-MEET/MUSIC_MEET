import { css } from "@emotion/react";
import DeleteIconButton from "components/common/ActionButton/DeleteIconButton";
import HeartVote from "components/common/HeartVote";
import React from "react";
import { useTranslation } from "react-i18next";


interface TextInfoProps {
    title?: string;
    user?: string;
    createdAt?: string;
    isVote?: boolean;
    voteCount?: string;
    vote: () => void;
}

function TextInfo(props: TextInfoProps) {
    const { t } = useTranslation<"coverViewPage">("coverViewPage");

    return (
        <div css={style}>
            <h2 className="title">{props.title}</h2>
            <div className="row">
                <span className="user">{props.user}</span>
                <DeleteIconButton />
            </div>

            <span className="createdat">{t("createdAt")}: {props.createdAt}</span>
            <HeartVote
                count={props.voteCount}
                isVote={props.isVote}
                onClick={props.vote}
            />
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
    & > h2 {
        font-weight: 800;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }

    .row {
        display: flex;
        flex-direction: row;
        .user {
            font-weight: 600;
            font-size: 1.3rem;
        }
        .delete-button {
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