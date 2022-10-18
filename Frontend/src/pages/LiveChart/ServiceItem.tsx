import styled from "@emotion/styled";
import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "store/ThemeContext";
import { ServiceItemType } from "./ServiceSelector";

function ServiceItem(props: ServiceItemType & { isSelected: boolean } & { callback?: (item: string) => void }) {
    const { isSelected, darkImg, lightImg, alt, selectedColor } = props;
    const navigator = useNavigate();
    const ctx = useContext(ThemeContext);

    const itemClickHandler = useCallback(() => {
        if (props.url !== "")
            navigator(`${props.url}`);
        props.callback?.(props.name);
    }, [navigator, props]);

    const renderImage = useCallback((): string => {
        if (ctx.theme === "dark")
            return darkImg;
        else if (ctx.theme === "light" && isSelected)
            return darkImg;
        else
            return lightImg;
    }, [ctx.theme, darkImg, isSelected, lightImg]);

    return (
        <Item select={isSelected} selectedColor={selectedColor} onClick={itemClickHandler}>
            <img src={renderImage()} alt={alt} />
        </Item>
    );
}

const Item = styled.li<{ select: boolean, selectedColor: string }>`
    display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.select ? props.selectedColor : ""};
        border: ${props => props.select ? "" : "1px solid gray"};
        border-radius: 10px;
        width: 6.25rem;
        height: 2.5rem;
        overflow: hidden;
        cursor: pointer;
        margin-right: 0.625rem;
`;
export default React.memo(ServiceItem);

