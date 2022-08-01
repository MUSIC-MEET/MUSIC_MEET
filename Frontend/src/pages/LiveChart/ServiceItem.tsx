import styled from "@emotion/styled";
import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "store/ThemeContext";


interface ServiceItemProps {
    isSelected: boolean;
    darkImg: string;
    lightImg: string;
    alt: string;
    name: string;
}

function ServiceItem(props: ServiceItemProps) {
    const { isSelected, darkImg, lightImg, alt, name } = props;
    const navigator = useNavigate();
    const ctx = useContext(ThemeContext);

    const itemClickHandler = useCallback(() => {
        navigator(`/livechart/${name}/100`);
    }, [name, navigator]);

    return (
        <Item select={isSelected} onClick={itemClickHandler}>
            <img src={ctx.theme === "dark" ? darkImg : lightImg} alt={alt} />
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