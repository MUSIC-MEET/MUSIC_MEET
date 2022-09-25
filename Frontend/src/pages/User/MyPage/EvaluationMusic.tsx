import React from "react";
import SectionWrapper from "components/common/SectionWrapper";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import EvalutionMusicList from "./EvaluationMusicList";

/**
 * 최근 평가한 음악 컴포넌트
 * @returns 
 */
function EvaluationMusic() {
    const { data } = useQuery(["evalutionMusic"], () => { /* TODO */ }, {

    });
    return (
        <SectionWrapper css={style}>
            <h2>{"최근 평가한 음악"}</h2>
            <EvalutionMusicList
            // list={data}
            />
        </SectionWrapper>
    );
}

const style = css`
    & > h2 {
        font-size: 1.3rem;
        font-weight: 400;
        margin-bottom: 0.5rem;
    }
`;

export default EvaluationMusic;