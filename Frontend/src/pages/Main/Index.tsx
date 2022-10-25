import React, { Suspense } from "react";
import LiveChart from "./LiveChart/LiveChart";
import MainWrapper from "./MainWrapper";
import { useTranslation } from "react-i18next";
import LiveChartSub from "./LiveChart/LiveChartSub";

import AlbumMusicArea from "./AlbumMusic/AlbumMusicArea";
import CoverMusicArea from "./CoverMusic/CoverMusicArea";
import GenreBoardArea from "./GenreBoard/GenreBoardArea";

function Index() {
    const { t } = useTranslation<"mainPage">("mainPage");
    return (
        <React.Fragment>

            <AlbumMusicArea />
            <CoverMusicArea />
            <GenreBoardArea />
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