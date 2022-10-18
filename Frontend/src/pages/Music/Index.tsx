import React, { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import Content from "components/UI/Content";
import MusicInfo from "./MusicInfo";
import Loading from "components/common/Loading";
import Title from "components/common/Title";
import Comments from "./Comments";
import ErrorBoundary from "./ErrorBoundary";
import { css } from "@emotion/react";

/**
 * 음악 페이지 메인
 * @returns 
 */
function Index() {
    const params = useParams<{ musicNum: string; }>();
    const musicNum = params.musicNum ?? "-1";

    useEffect(() => {
        //
    }, [params.musicNum]);

    return (
        <React.Fragment>
            <Title>{"곡 정보"}</Title>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <MusicInfo musicNum={musicNum} />
                    <Comments musicNum={musicNum} />
                </Suspense>
            </ErrorBoundary>
        </React.Fragment>
    );
}


export default Index;