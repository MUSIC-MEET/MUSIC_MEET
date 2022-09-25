import { css } from "@emotion/react";
import React, { useEffect } from "react";
import EvalutionMusicItem from "./EvaluationMusicItem";
import LatestEvaluationMusic from "./LatestEvaluationType";
/**
 * 최근 평가한 음악 리스트
 * @returns 
 */
function EvaluationMusicList({ list }: { list?: LatestEvaluationMusic[] }) {

    useEffect(() => {
        console.log(list);
        console.log("re-redner");
    }, [list]);

    return (
        <ul css={style}>
            {
                list?.map((item, index) => (
                    <EvalutionMusicItem
                        key={index}
                        {...item}
                    />
                ))
            }
        </ul>
    );
}

const style = css`
    min-height: 3rem;
    border-top: 2px solid rgb(88, 88, 88);
    border-bottom : 2px solid rgb(88, 88, 88);
    padding: 1rem 1rem;

    & > li {
        margin-bottom: 1rem;
    }

    & > li:last-child {
        margin-bottom: 0;
    }
`;
export default EvaluationMusicList;