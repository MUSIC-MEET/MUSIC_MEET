import styled from "@emotion/styled";
import React, { useContext } from "react";
import ThemeContext from "store/ThemeContext";

interface MenuItemProps {
    name: string;
    id: number;
    selected: boolean;
    onClick: (id: number) => void;
}

interface ItemStyleProps {
    isSelect: boolean;
    fontColor: string;
    borderColor: string;
    selectedColor: string;
    selectedBorderColor: string;
}

function MenuItem(props: MenuItemProps) {
    const ctx = useContext(ThemeContext);
    const { fontColor, selectedColor, borderColor, selectedBorderColor } = ctx.themeStyle.musicPlayer.content.menu;
    return (
        <Item
            isSelect={props.selected}
            fontColor={fontColor}
            borderColor={borderColor}
            selectedColor={selectedColor}
            selectedBorderColor={selectedBorderColor}
            onClick={() => props.onClick(props.id)}
        >
            <p>{props.name}</p>
        </Item>
    );
}

const Item = React.memo(styled.li<ItemStyleProps>`
    width: 100%;
    height: 100%;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: 0.5s;
    border-bottom: ${props => props.isSelect ? `2px solid ${props.selectedColor}` : `1px solid ${props.borderColor}`};
    p { 
        
        color: ${props => props.isSelect ? props.selectedColor : props.fontColor}
    }
`);

export default MenuItem;