import React from "react";
import LiveChart from "./LiveChart/LiveChart";
import MainWrapper from "./MainWrapper";
import { useTranslation } from "react-i18next";
import LiveChartSub from "./LiveChart/LiveChartSub";
import AlbumMusic from "./AlbumMusic/AlbumMusic";
import AlbumMusicSub from "./AlbumMusic/AlbumMusicSub";
import AlbumMusicArea from "./AlbumMusic/AlbumMusicArea";

function Index() {
    const { t } = useTranslation<"mainPage">("mainPage");
    return (
        <React.Fragment>
            <AlbumMusicArea />

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