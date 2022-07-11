import styled from "@emotion/styled";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import TopText from "./TopText";

function Index() {
    return (
        <Wrap>
            <TopText />
            <Routes>
                <Route path=":service/:rank" element={<Chart />} />
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

export default React.memo(Index);