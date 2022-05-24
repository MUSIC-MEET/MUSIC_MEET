import Title from "components/common/Title";
import Content from "components/UI/Content";
import React from "react";
import { useTranslation } from "react-i18next";

function Index() {
    const { t } = useTranslation("setting");
    return (
        <Content>
            <Title>{t("setting")}</Title>
        </Content>
    );
}

export default Index;