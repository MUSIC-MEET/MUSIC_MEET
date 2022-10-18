import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function LiveChartSub() {
    const { t } = useTranslation<"mainPage">("mainPage");
    const navigator = useNavigate();
    const onClickHandler = useCallback(() => {
        navigator("/livechart/melon");
    }, [navigator]);
    return (
        <div css={style}>
            <span onClick={onClickHandler}>{t("more")}</span>
        </div>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    span {
        cursor: pointer;
    }
`;
export default LiveChartSub;

function useCallbacK(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
