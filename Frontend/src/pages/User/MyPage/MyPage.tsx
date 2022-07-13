import React, { Suspense, useLayoutEffect } from "react";
import Content from "components/UI/Content";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import UserEdit from "./UserEdit";
import CurrentPage from "store/CurrentPage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Loading from "../../../components/common/Loading";
import LoginState from "store/LoginState";
import ErrorBoundary from "components/common/ErrorBoundary";

function MyPage() {
    const { t } = useTranslation<"myPage">("myPage");
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useLayoutEffect(() => {
        setCurrentPage(-1);
    }, [isLogIn, setCurrentPage]);
    return (
        <Content>
            <Title>{t("title")}</Title>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <UserEdit />
                </Suspense>
            </ErrorBoundary>
        </Content>
    );
}

export default MyPage;