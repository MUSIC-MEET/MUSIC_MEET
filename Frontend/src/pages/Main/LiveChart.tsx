import SectionWrapper from "components/common/SectionWrapper";
import Chart from "pages/LiveChart/Chart";
import ChartList from "pages/LiveChart/ChartList";
import ServiceSelector, { ServiceItemType } from "pages/LiveChart/ServiceSelector";
import TopText from "pages/LiveChart/SubText";
import React, { useCallback, useMemo, useState } from "react";


import Dmelon from "assets/Dmelon.png";
import Dgenine from "assets/Dgenie.png";
import Lmelon from "assets/Lmelon.png";
import Lgenine from "assets/Lgenie.png";
import DBugs from "assets/DBugs.png";
import LBugs from "assets/LBugs.png";
import DFlo from "assets/DFlo.png";
import LFlo from "assets/LFlo.png";

function LiveChart() {
    const [selected, setSelected] = useState<string>("melon");
    const selectChangeHandler = useCallback((item: string) => {
        setSelected(() => item);
    }, []);
    const services: ServiceItemType[] = useMemo<ServiceItemType[]>(() => [
        {
            id: 0,
            name: "melon",
            alt: "melon_log",
            darkImg: Dmelon,
            lightImg: Lmelon,
            selectedColor: "rgb(37, 128, 55)",
            url: ""
        },
        {
            id: 1,
            name: "bugs",
            alt: "Bugs_log",
            darkImg: DBugs,
            lightImg: LBugs,
            selectedColor: "rgb(255, 59, 42)",
            url: ""
        },
        {
            id: 2,
            name: "genie",
            alt: "genie_log",
            darkImg: Dgenine,
            lightImg: Lgenine,
            selectedColor: "rgb(37, 137, 251)",
            url: ""

        },
        {
            id: 3,
            name: "flo",
            alt: "FLO_log",
            darkImg: DFlo,
            lightImg: LFlo,
            selectedColor: "rgb(47, 25 ,458)",
            url: ""
        },
    ], []);
    return (
        <React.Fragment>
            <TopText />
            <ServiceSelector
                service={selected}
                services={services}
                callback={selectChangeHandler}
            />
            <ChartList
                service={selected}
                rank="5"
            />
        </React.Fragment>
    );
}

export default LiveChart;