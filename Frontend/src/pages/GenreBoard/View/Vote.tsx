import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import vote from "utils/RequestApis/GenreBoard/vote";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import AlertModal from "components/AlertModal/AlertModal";
import { useTranslation } from "react-i18next";

/**
 * 게시글 추천 컴포넌트
 * @returns {React.FC}
 */
function Vote({ upvote, downvote }: { upvote?: number, downvote?: number }) {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "-1";
    const queryClient = useQueryClient();
    const [notLoginAlertShown, setNotLoginAlertShown] = useState<boolean>(false);
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const { t } = useTranslation<"genreBoardViewer">("genreBoardViewer");
    const { mutate } = useMutation(vote, {
        useErrorBoundary: true,
        onSuccess: () => {
            queryClient.invalidateQueries(["genreBoardPost", genre, num]);
        },
    });

    const voteHandler = useCallback((type: "upvote" | "downvote") => {
        if (!isLogIn) {
            setNotLoginAlertShown(true);
            return;
        }
        mutate({ genre, num, type });
    }, [genre, isLogIn, mutate, num]);

    return (
        <section css={style}>
            {
                notLoginAlertShown &&
                <AlertModal
                    title={t("vote.notLogin.title")}
                    content={t("vote.notLogin.content")}
                    button={t("vote.notLogin.button")}
                    onClose={() => setNotLoginAlertShown(false)}
                    buttonClick={() => setNotLoginAlertShown(false)}
                />
            }
            <button
                className="upvote vote"
                onClick={() => voteHandler("upvote")}
            >
                <ThumbUpAltIcon className="vote-icon" />
                <span>{upvote}</span>
            </button>
            <button
                className="downvote vote"
                onClick={() => voteHandler("downvote")}
            >
                <ThumbDownAltIcon className="vote-icon" />
                <span>{downvote}</span>
            </button>
        </section >
    );
}

const style = css`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .vote-icon {
        margin-right: 0.3rem;
    }

    .vote {
        all: unset;
        cursor: pointer;    
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.5rem;
        height: 2.5rem;
        margin-left : 1rem;
        color: white;
        border-radius: 3px;
    }

    .upvote {
        background-color: #b3301f;
    }

    .downvote {
        background-color: #3f51b5;
    }
`;


export default React.memo(Vote);