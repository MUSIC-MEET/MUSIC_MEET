import styled from "@emotion/styled";
import React from "react";

interface ButtonWrapperProps {
    children: React.ReactNode;
}

function ButtonWrapper(props: ButtonWrapperProps) {
    return (
        <Wrap>
            {props.children}
        </Wrap>
    );
}
const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export default ButtonWrapper;