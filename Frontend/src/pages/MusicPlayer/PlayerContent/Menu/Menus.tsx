import React from "react";
import MenuItem from "./MenuItem";
import TabMenuListType from "../TabMenuListType";
import { css } from "@emotion/react";

interface MenusProps {
    menus: TabMenuListType[];
    currentMenu: number;
    menuClickHandler: (id: number) => void;
}

function Menus(props: MenusProps) {
    return (
        <ul css={style}>
            {props.menus.map((menu) => (
                <MenuItem
                    key={menu.id}
                    {...menu}
                    selected={props.currentMenu === menu.id}
                    onClick={props.menuClickHandler}
                />
            ))}
        </ul>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export default Menus;