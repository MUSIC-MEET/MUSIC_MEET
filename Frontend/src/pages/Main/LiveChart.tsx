import { Wrap } from "components/AlertModal/Wrap";
import SectionWrapper from "components/common/SectionWrapper";
import Chart from "pages/LiveChart/Chart";
import ChartList from "pages/LiveChart/ChartList";
import TopText from "pages/LiveChart/TopText";
import React, { useState } from "react";

function LiveChart() {
    const [selectedChart, setSelectedChart] = useState<string>("melon");
    return (
        <SectionWrapper>
            <TopText />
            <ChartList
                service={selectedChart}
                rank="5"
            />
        </SectionWrapper>
    );
}

export default LiveChart;