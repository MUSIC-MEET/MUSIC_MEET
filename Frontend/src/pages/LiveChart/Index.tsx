import styled from "@emotion/styled";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import MainText from "./MainText";
import SubText from "./SubText";

function Index() {
    return (
        <Wrap>
            <Section>
                <MainText />
                <SubText />
            </Section>
            <Routes>
                <Route path=":service/:rank" element={<Chart />} />
                <Route path=":service" element={<Chart />} />
                <Route path="*" element={<Chart />} />
            </Routes>
        </Wrap>
    );
}

const Wrap = styled.div`
    width: 80vw;
    min-height: 100vh;
    margin-top: 7.5rem;
`;

const Section = React.memo(styled.section`
    & > h1 { margin-bottom: 0.8rem };
    & > * {
        margin-bottom: 0.8rem;
    }
`);

export default React.memo(Index);