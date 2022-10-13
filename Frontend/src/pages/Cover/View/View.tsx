import React, { Suspense } from "react";
import Title from "components/common/Title";
import CoverInfo from "./CoverInfo";
import ErrorBoundary from "../ErrorBoundary";
import Loading from "components/common/Loading";
import Comments from "./Comments";

function View() {
    return (
        <React.Fragment>
            <Title>{"커버 조회"}</Title>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <CoverInfo />
                    <Comments />
                </Suspense>
            </ErrorBoundary >
        </React.Fragment>
    );
}

export default View;