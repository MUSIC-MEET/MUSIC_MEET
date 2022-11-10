import styled from "@emotion/styled";
import React, { useContext } from "react";
import ThemeContext from "store/ThemeContext";

interface SelectComponentProps {
    children: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


function Select(props: SelectComponentProps) {
    const ctx = useContext(ThemeContext);
    return (
        <SelectComponent
            onChange={props.onChange}
            fontColor={ctx.themeStyle.fontStyle1.color}
            borderColor={ctx.themeStyle.input.borderColor}
            backgroundColor={ctx.themeStyle.menu.background}
        >
            {props.children}
        </SelectComponent>
    );
}
const SelectComponent = styled.select<{ fontColor: string; borderColor: string; backgroundColor: string; }>`
    padding: 0.5rem;
    color: ${props => props.fontColor};
    border-color: ${props => props.borderColor};
    background: none;
`;


export default Select;