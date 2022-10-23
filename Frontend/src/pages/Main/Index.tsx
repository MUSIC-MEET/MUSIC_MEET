import React, { Suspense } from "react";
import LiveChart from "./LiveChart/LiveChart";
import MainWrapper from "./MainWrapper";
import { useTranslation } from "react-i18next";
import LiveChartSub from "./LiveChart/LiveChartSub";
import Loading from "components/common/Loading";

import AlbumMusicArea from "./AlbumMusic/AlbumMusicArea";
import CoverMusicArea from "./CoverMusic/CoverMusicArea";

function Index() {
    const { t } = useTranslation<"mainPage">("mainPage");
    return (
        <React.Fragment>
            <Suspense fallback={<Loading />}>
                <AlbumMusicArea />
                <CoverMusicArea />
                <MainWrapper
                    title={t("title.liveChart")}
                    subMenu={<LiveChartSub />}
                >
                    <LiveChart />
                </MainWrapper>
            </Suspense>

        </React.Fragment>
    );
}

export default Index;