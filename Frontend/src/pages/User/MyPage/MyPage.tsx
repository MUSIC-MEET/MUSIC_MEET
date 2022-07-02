import React from "react";
import Content from "components/UI/Content";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";

function MyPage() {
    const { t } = useTranslation<"myPage">("myPage");
    return (
        <Content>
            <Title>{t("title")}</Title>
        </Content>
    );
}

export default MyPage;