import React from "react";
import SectionWrapper from "components/common/SectionWrapper";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import EvalutionMusicList from "./EvaluationMusicList";
import fetchEvaluation from "utils/RequestApis/MyPage/fetchEvaluation";
import { useTranslation } from "react-i18next";
import LoginState from "store/LoginState";
import { useRecoilValue } from "recoil";

/**
 * 최근 평가한 음악 컴포넌트
 * @returns 
 */
function EvaluationMusic() {
    const { nickname, key } = useRecoilValue<{ nickname: string; key: string }>(LoginState);
    const { data } = useQuery(["evalutionMusic", nickname, key], () => fetchEvaluation(), {
        suspense: true,
        useErrorBoundary: true
    });

    const { t } = useTranslation<"myPage">("myPage");
    return (
        <SectionWrapper css={style}>
            <h2>{t("evaluation.title")}</h2>
            <EvalutionMusicList
                list={data}
            />
        </SectionWrapper>
    );
}

const style = css`
    width: 80vw;
    & > h2 {
        font-size: 1.3rem;
        font-weight: 400;
        margin-bottom: 0.5rem;
    }
`;

export default EvaluationMusic;