import React from "react";
import { useParams } from "react-router-dom";
import ServiceSelector from "./ServiceSelector";

function Chart() {
    const params =
        useParams<{ service: string; rank: string; }>();
    const service = (params.service)?.toLowerCase() ?? "melon";
    const rank = params.rank ?? 100;

    return (
        <section>
            <ServiceSelector
                service={service}
            />
        </section>
    );
}

export default Chart;