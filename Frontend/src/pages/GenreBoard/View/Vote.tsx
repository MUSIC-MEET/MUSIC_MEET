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
import UpVoteButton from "components/common/VoteButton/UpVoteButton";
import DownVoteButton from "components/common/VoteButton/DownVoteButton";

/**
 * 게시글 추천 컴포넌트
 * @returns {React.FC}
 */
function Vote({ upvote, downvote }: { upvote?: string, downvote?: string }) {
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
            queryClient.invalidateQueries("genreBoardPost");
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
            <UpVoteButton
                onClick={() => voteHandler("upvote")}
                value={upvote}
            />
            <DownVoteButton
                onClick={() => voteHandler("downvote")}
                value={downvote}
            />
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
        width: 4.5rem;
        height: 2.5rem;
        margin-left : 1rem;
    }
`;


export default React.memo(Vote);