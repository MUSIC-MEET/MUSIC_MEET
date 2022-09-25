import { css } from "@emotion/react";
import React from "react";
import EvalutionMusicItem from "./EvaluationMusicItem";

/**
 * 최근 평가한 음악 리스트
 * @returns 
 */
function EvaluationMusicList(/*{ list }: { list?: any[] }*/) {
    const list: any[] = [
        { num: 1 },
    ];
    return (
        <ul css={style}>
            {
                list?.map((item) => (
                    <EvalutionMusicItem
                        key={item.num}
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
`;
export default EvaluationMusicList;