import styled from "@emotion/styled";
import React, { useMemo } from "react";
import ServiceItem from "./ServiceItem";
interface SelectorProps {
    service: string;
}

import Dmelon from "assets/Dmelon.png";
import Dvibe from "assets/Dvibe.png";
import Dspotify from "assets/Dspotify.png";
import Dgenine from "assets/Dgenie.png";
import Lmelon from "assets/Lmelon.png";
import Lspotify from "assets/Lspotify.png";
import Lgenine from "assets/Lgenie.png";

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
            selectedColor: "rgb(37, 128,55)"
        },
        {
            id: 1,
            name: "spotify",
            alt: "Spotify_log",
            darkImg: Dspotify,
            lightImg: Lspotify,
            selectedColor: "#e606d3"
        },
        {
            id: 2,
            name: "genie",
            alt: "genie_log",
            darkImg: Dgenine,
            lightImg: Lgenine,
            selectedColor: "rgb(37, 137, 251)"
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