import React, { Suspense, useLayoutEffect } from "react";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import UserEdit from "./UserEdit";
import CurrentPage from "store/CurrentPage";
import { useSetRecoilState } from "recoil";
import Loading from "components/common/Loading";
import ErrorBoundary from "./ErrorBoundary";
import EvaluationMusic from "./EvaluationMusic";

function MyPage() {
    const { t } = useTranslation<"myPage">("myPage");
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useLayoutEffect(() => {
        setCurrentPage(-1);
    }, [setCurrentPage]);
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <UserEdit />
                    <EvaluationMusic />
                </Suspense>
            </ErrorBoundary>
        </React.Fragment>
    );
}


export default MyPage;