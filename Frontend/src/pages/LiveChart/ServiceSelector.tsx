import styled from "@emotion/styled";
import React, { useMemo } from "react";
import ServiceItem from "./ServiceItem";
interface SelectorProps {
    service: string;
}

import Dmelon from "assets/Dmelon.png";
import Dgenine from "assets/Dgenie.png";
import Lmelon from "assets/Lmelon.png";
import Lgenine from "assets/Lgenie.png";
import DBugs from "assets/DBugs.png";
import LBugs from "assets/LBugs.png";
import DFlo from "assets/DFlo.png";
import LFlo from "assets/LFlo.png";

interface ServiceItemType {
    id?: number;
    name: string;
    alt: string;
    lightImg: string;
    darkImg: string;
    selectedColor: string;
}

function ServiceSelector(props: SelectorProps) {
    const { service } = props;
    const services: ServiceItemType[] = useMemo<ServiceItemType[]>(() => [
        {
            id: 0,
            name: "melon",
            alt: "melon_log",
            darkImg: Dmelon,
            lightImg: Lmelon,
            selectedColor: "rgb(37, 128, 55)"
        },
        {
            id: 1,
            name: "bugs",
            alt: "Bugs_log",
            darkImg: DBugs,
            lightImg: LBugs,
            selectedColor: "rgb(255, 59, 42)"
        },
        {
            id: 2,
            name: "genie",
            alt: "genie_log",
            darkImg: Dgenine,
            lightImg: Lgenine,
            selectedColor: "rgb(37, 137, 251)"
        },
        {
            id: 3,
            name: "flo",
            alt: "FLO_log",
            darkImg: DFlo,
            lightImg: LFlo,
            selectedColor: "rgb(47, 25 ,458)"
        },
    ], []);
    return (
        <List>
            {services.map(item => (
                <ServiceItem
                    key={item.id}
                    isSelected={item.name.toLowerCase() === service}
                    alt={item.alt}
                    darkImg={item.darkImg}
                    lightImg={item.lightImg}
                    name={item.name}
                    selectedColor={item.selectedColor}
                />
            ))}
        </List>
    );
}

const List = styled.ul`
    display: flex;
    flex-direction: row;
    margin-top: 16px;
`;

export default React.memo(ServiceSelector);

export { ServiceItemType };