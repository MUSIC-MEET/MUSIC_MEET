import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/**
 * 메인 페이지 장르게시판 서브메뉴 컴포넌트
 * @returns 
 */
function GenreBoardSub() {
    const { t } = useTranslation<"mainPage">("mainPage");
    const navigator = useNavigate();
    return (
        <div>
            <span
                onClick={() => navigator("/board/kpop")}
                css={spanStyle}
            >
                {t("more")}
            </span>
        </div>
    );
}

const spanStyle = css`
    position: absolute;
    right: 0;
    cursor: pointer;
`;

export default GenreBoardSub;