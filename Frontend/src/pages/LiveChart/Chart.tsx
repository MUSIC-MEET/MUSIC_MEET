import React from "react";
import { useParams } from "react-router-dom";
import ChartList from "./ChartList";
import ServiceSelector from "./ServiceSelector";

function Chart() {
    const params =
        useParams<{ service: string; rank: string; }>();
    const service = (params.service)?.toLowerCase() ?? "melon";
    const rank = params.rank ?? "100";

    return (
        <section>
            <ServiceSelector
                service={service}
            />
            <ChartList
                service={service}
                rank={rank}
            />

        </section>
    );
}

export default Chart;