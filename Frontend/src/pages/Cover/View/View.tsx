import React, { Suspense } from "react";
import Content from "components/UI/Content";
import Title from "components/common/Title";
import CoverInfo from "./CoverInfo";
import ErrorBoundary from "../ErrorBoundary";
import Loading from "components/common/Loading";
import { css } from "@emotion/react";

function View() {

    return (
        <Content css={style}>
            <Title>{"커버 조회"}</Title>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <CoverInfo />
                </Suspense>
            </ErrorBoundary >
        </Content>
    );
}

const style = css`
    & > .section-wrapper {
        width: 80vw;
        margin-bottom: 0.5rem;
    }
`;

export default View;