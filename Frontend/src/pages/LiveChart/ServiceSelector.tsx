import styled from "@emotion/styled";
import React from "react";
import ServiceItem from "./ServiceItem";

interface ServiceItemType {
    id?: number;
    name: string;
    alt: string;
    lightImg: string;
    darkImg: string;
    selectedColor: string;
    url: string;
}

interface SelectorProps {
    service: string;
    services: ServiceItemType[];
    callback?: (item: string) => void;
}

function ServiceSelector(props: SelectorProps) {
    const { service, services } = props;

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
                    url={item.url}
                    callback={props.callback}
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