import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ChartList from "./ChartList";
import ServiceSelector, { ServiceItemType } from "./ServiceSelector";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import { useTranslation } from "react-i18next";
import Error from "components/common/Error";
import { css } from "@emotion/react";

import Dmelon from "assets/Dmelon.png";
import Dgenine from "assets/Dgenie.png";
import Lmelon from "assets/Lmelon.png";
import Lgenine from "assets/Lgenie.png";
import DBugs from "assets/DBugs.png";
import LBugs from "assets/LBugs.png";
import DFlo from "assets/DFlo.png";
import LFlo from "assets/LFlo.png";

function Chart() {
    const { t } = useTranslation<"liveChartPage">("liveChartPage");
    const params =
        useParams<{ service: string; rank: string; }>();
    const serviceList = useMemo(() => ["melon", "bugs", "genie", "flo"], []);
    const service: string = params.service ?? "melon";
    const isNotSupportedService = useMemo(() => !serviceList.includes(service), [service, serviceList]);
    const rank = params.rank ?? "100";
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(1);
    }, [setCurrentPage, service, rank]);


    const services: ServiceItemType[] = useMemo<ServiceItemType[]>(() => [
        {
            id: 0,
            name: "melon",
            alt: "melon_log",
            darkImg: Dmelon,
            lightImg: Lmelon,
            selectedColor: "rgb(37, 128, 55)",
            url: "/liveChart/melon"
        },
        {
            id: 1,
            name: "bugs",
            alt: "Bugs_log",
            darkImg: DBugs,
            lightImg: LBugs,
            selectedColor: "rgb(255, 59, 42)",
            url: "/livechart/bugs"
        },
        {
            id: 2,
            name: "genie",
            alt: "genie_log",
            darkImg: Dgenine,
            lightImg: Lgenine,
            selectedColor: "rgb(37, 137, 251)",
            url: "/livechart/genie"
        },
        {
            id: 3,
            name: "flo",
            alt: "FLO_log",
            darkImg: DFlo,
            lightImg: LFlo,
            selectedColor: "rgb(47, 25 ,458)",
            url: "/livechart/flo"
        },
    ], []);


    return (
        <section>
            <ServiceSelector
                service={service}
                services={services}
            />
            {isNotSupportedService ?
                <div css={errorWrapper}><Error>{t("notSupported")}</Error></div> :
                <ChartList
                    service={service}
                    rank={rank}
                />
            }
        </section>
    );

}

const errorWrapper = css`
    margin-top: 2rem;
    & > b {
        font-size: 1.2rem;
        font-weight: bold;
    }
`;



export default React.memo(Chart);