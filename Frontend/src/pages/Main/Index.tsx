import React from "react";
import Content from "components/UI/Content";
import LiveChart from "./LiveChart";
import MainWrapper from "./MainWrapper";
import { useTranslation } from "react-i18next";
import LiveChartSub from "./LiveChartSub";

function Index() {
    const { t } = useTranslation<"mainPage">("mainPage");
    return (
        <React.Fragment>
            <MainWrapper
                title="음악"

            />
            <MainWrapper
                title={t("title.liveChart")}
                subMenu={<LiveChartSub />}
            >
                <LiveChart />
            </MainWrapper>
        </React.Fragment>
    );
}

export default Index;