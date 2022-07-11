import styled from "@emotion/styled";
import React from "react";


import melon from "assets/melon.png";


interface ServiceItemProps {
    isSelected: boolean;
    darkImg: string;
    lightImg: string;
    alt: string;
}
function ServiceItem(props: ServiceItemProps) {
    const { isSelected, darkImg, lightImg, alt } = props;
    return (
        <Item select={isSelected}>
            <img src={darkImg} alt={alt} />
        </Item>
    );
}

const Item = styled.li<{ select: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.select ? "rgb(37,128,55)" : ""};
    border: 1px solid gray;
    border-radius: 10px;
    width: 6.25rem;
    height: 2.5rem;
    overflow: hidden;
    
    cursor: pointer;
    margin-right: 0.625rem;
`;
export default React.memo(ServiceItem);