import styled from "@emotion/styled";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface GenreButtonProps {
    name: string;
    text: string;
    isSelected: boolean;
}

function GenreButton({ name, text, isSelected }: GenreButtonProps) {
    const navigator = useNavigate();
    useEffect(() => {
        //
    }, [isSelected, text]);

    const ItemClickHandler = useCallback(() => {
        navigator(`/board/${name}`);
    }, [name, navigator]);

    return (
        <Item
            isSelected={isSelected}
            onClick={ItemClickHandler}
        >
            {text}
        </Item>
    );
}

const Item = React.memo(
    styled.li<{ isSelected: boolean }>`
        padding: 1rem;
        border: 1px solid ${props => props.isSelected ? "none" : "gray"};
        cursor: pointer;
        margin-right: 2rem;
        font-size: 0.8rem;
        text-overflow: ellipsis;
        max-height: 3rem;
        border-radius: 8px;
        &:hover {
            background: ${props => props.isSelected ? "" : "rgba(88, 88, 88, 0.1)"};
        }
        background-color: ${props => props.isSelected ? "#477e94" : ""};  
`
);

export default React.memo(GenreButton);