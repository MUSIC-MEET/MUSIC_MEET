import React from "react";
import LiveChart from "./LiveChart/LiveChart";
import MainWrapper from "./MainWrapper";
import { useTranslation } from "react-i18next";
import LiveChartSub from "./LiveChart/LiveChartSub";
import MusicList from "./MusicList/MusicList";

function Index() {
    const { t } = useTranslation<"mainPage">("mainPage");
    return (
        <React.Fragment>
            <MainWrapper
                title="음악"
            >
                <MusicList />
            </MainWrapper>
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