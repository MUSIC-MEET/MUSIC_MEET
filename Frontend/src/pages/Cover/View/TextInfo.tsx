import { css } from "@emotion/react";
import HeartVote from "components/common/HeartVote";
import React from "react";
import { useTranslation } from "react-i18next";


interface TextInfoProps {
    title?: string;
    user?: string;
    createdAt?: string;
    isVote?: boolean;
    count?: string;
}

function TextInfo(props: TextInfoProps) {
    const { t } = useTranslation<"coverViewPage">("coverViewPage");

    return (
        <div css={style}>
            <h2 className="title">{props.title}</h2>
            <span className="user">{props.user}{props.user}</span>
            <span className="createdat">{t("createdAt")}: {props.createdAt}</span>
            <HeartVote
                count={"0"}
                isVote={props.isVote}
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

    & > .user {
        font-weight: 600;
        font-size: 1.3rem;
    }

    & > .createdat {
        font-size: 0.8rem;
        color: #b2b0b0;
    }
`;

export default TextInfo;