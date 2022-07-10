import styled from "@emotion/styled";
import React from "react";
import TopText from "./TopText";

function Index() {
    return (
        <Wrap>
            <TopText />
        </Wrap>
    );
}

const Wrap = styled.div`
    width: 80vw;
    min-height: 100vh;
    margin-top: 7.5rem;
`;

export default Index;