import React, { Suspense, useLayoutEffect } from "react";
import Content from "components/UI/Content";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import UserEdit from "./UserEdit";
import CurrentPage from "store/CurrentPage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Loading from "../../../components/common/Loading";
import LoginState from "store/LoginState";
import { useNavigate } from "react-router-dom";

function MyPage() {
    const { t } = useTranslation<"myPage">("myPage");
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const navigator = useNavigate();
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useLayoutEffect(() => {
        if (!isLogIn) navigator("/");
        setCurrentPage(-1);
    }, [isLogIn, navigator, setCurrentPage]);
    return (
        <Content>
            <Title>{t("title")}</Title>
            <Suspense fallback={<Loading />}>
                <UserEdit />
            </Suspense>
        </Content>
    );
}

export default MyPage;