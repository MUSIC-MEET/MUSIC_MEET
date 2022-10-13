import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ChartList from "./ChartList";
import ServiceSelector from "./ServiceSelector";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import { useTranslation } from "react-i18next";
import Error from "components/common/Error";
import { css } from "@emotion/react";

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

    return (
        <section>
            <ServiceSelector
                service={service}
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