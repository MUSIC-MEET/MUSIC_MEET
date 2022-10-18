import React from "react";
import Content from "components/UI/Content";
import LiveChart from "./LiveChart";
import MainWrapper from "./MainWrapper";
import { useTranslation } from "react-i18next";
import LiveChartSub from "./LiveChartSub";

function Index() {
    const { t } = useTranslation<"mainPage">("mainPage");
    return (
        <Content>
            <MainWrapper
                title={"실시간 차트"}
                subMenu={<LiveChartSub />}
            >
                <LiveChart />
            </MainWrapper>
        </Content>
    );
}

export default Index;