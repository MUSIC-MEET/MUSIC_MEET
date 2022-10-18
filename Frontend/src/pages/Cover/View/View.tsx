import React, { Suspense } from "react";
import Title from "components/common/Title";
import CoverInfo from "./CoverInfo";
import ErrorBoundary from "../ErrorBoundary";
import Loading from "components/common/Loading";
import Comments from "./Comments";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

function View() {
    const { t } = useTranslation<"coverViewPage">("coverViewPage");
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            < ErrorBoundary >
                <Suspense fallback={<Loading />}>
                    <article css={article}>
                        <CoverInfo />
                        <Comments />
                    </article>
                </Suspense>
            </ErrorBoundary >
        </React.Fragment>
    );
}


const article = css`
    & > .section-wrapper {
        width: 80vw;
    }
`;
export default View;