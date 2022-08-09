import Content from "components/UI/Content";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "./Board/Board";
import Write from "./Write/Write";
function Index() {
    return (
        <Content>
            <Routes>
                <Route path="/" element={<Board />} />
                <Route path="/:genre" element={<Board />} />
                <Route path=":genre/write" element={<Write />} />
            </Routes>
        </Content>
    );
}

export default Index;