import Title from "components/common/Title";
import React from "react";
import { useTranslation } from "react-i18next";

function MainText() {
    const { t } = useTranslation<"liveChartPage">("liveChartPage");
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
        </React.Fragment>
    );
}

export default MainText;