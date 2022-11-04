import styled from "@emotion/styled";
import React from "react";

interface MenuItemProps {
    name: string;
    id: number;
    selected: boolean;
    onClick: (id: number) => void;
}
function MenuItem(props: MenuItemProps) {
    return (
        <Item
        >
            <p onClick={() => props.onClick(props.id)}>{props.name}</p>
        </Item>
    );
}

const Item = React.memo(styled.li`
    width: 100%;
    height: 100%;
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid gray;
    p { 
        cursor: pointer;
    }
`);

export default MenuItem;