import React, { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicInfo from "./View/MusicInfo";
import Loading from "components/common/Loading";
import Title from "components/common/Title";
import Comments from "./View/Comments";
import ErrorBoundary from "./ErrorBoundary";
import { useTranslation } from "react-i18next";

/**
 * 음악 페이지 메인
 * @returns 
 */
function Index() {
    const params = useParams<{ musicNum: string; }>();
    const musicNum = params.musicNum ?? "-1";
    const { t } = useTranslation<"musicPage">("musicPage");
    useEffect(() => {
        //
    }, [params.musicNum]);

    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
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