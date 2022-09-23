import React, { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import Content from "components/UI/Content";
import MusicInfo from "./MusicInfo";
import Loading from "components/common/Loading";
import Title from "components/common/Title";
import ErrorBoundary from "./ErrorBoundary";


function Index() {
    const params = useParams<{ musicNum: string; }>();
    const musicNum = params.musicNum ?? "-1";

    useEffect(() => {
        //
    }, [params.musicNum]);

    return (
        <Content>
            <Title>{"곡 정보"}</Title>\

            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <MusicInfo musicNum={musicNum} />
                </Suspense>
            </ErrorBoundary>
        </Content>
    );
}

export default Index;