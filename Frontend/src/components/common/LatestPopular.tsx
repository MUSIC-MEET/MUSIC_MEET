import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import BaseProps from "components/common/BaseProps";
import styled from "@emotion/styled";
import ThemeContext from "store/ThemeContext";

interface LatestPopularProps {
    type: "latest" | "popular";
    onChange: (type: "latest" | "popular") => void;
}

/**
 * LatestPopular 컴포넌트
 * @param props.type - "latest" | "popular" 현재 타입
 * @param props.onChange 최신순인지 인기순인지 변경하는 함수 
 * @returns 
 */
function LatestPopular(props: LatestPopularProps & BaseProps) {
    const ctx = useContext(ThemeContext);
    const { t } = useTranslation<"latestPopular">("latestPopular");
    return (
        <Div
            className={`${props.className}`}
            color={ctx.themeStyle.fontStyle1.color}
            subColor={ctx.themeStyle.fontStyle2.color}
        >
            <span
                className={`latest ${props.type === "latest" ? "active" : ""}`}
                onClick={() => props.onChange("latest")}
            >
                {t("latest")}
            </span>
            <span
                className={`popular ${props.type === "popular" ? "active" : ""}`}
                onClick={() => props.onChange("popular")}
            >
                {t("popular")}
            </span>
        </Div>
    );
}

const Div = React.memo(styled.div<{ subColor: string; color: string; }>`
    width: 100%;
    margin-left: 3rem;
    justify-content: space-between;
    color: ${props => props.subColor};
    span { 
        cursor: pointer;
        font-size: 1.2rem;
        font-weight: 600;
    }
    .latest::after {
        content: " | ";
    }

    .active {
        color: ${props => props.color};
    }
`);

export default LatestPopular;