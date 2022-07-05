import React, { useLayoutEffect } from "react";
import Content from "components/UI/Content";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import UserEdit from "./UserEdit";
import CurrentPage from "store/CurrentPage";
import { useSetRecoilState } from "recoil";

function MyPage() {
    const { t } = useTranslation<"myPage">("myPage");
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useLayoutEffect(() => {
        setCurrentPage(-1);
    }, [setCurrentPage]);
    return (
        <Content>
            <Title>{t("title")}</Title>
            <UserEdit />
        </Content>
    );
}

export default MyPage;