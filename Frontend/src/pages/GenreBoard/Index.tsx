import Content from "components/UI/Content";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "./Board/Board";
import Write from "./Write/Write";
import PrivateRoute from "../../components/common/PrivateRoute";
import GenreBoardContextProvider from "../../store/GenreBoardContextProvider";
function Index() {
    return (
        <GenreBoardContextProvider>
            <Content>
                <Routes>
                    <Route path="/" element={<Board />} />
                    <Route path="/:genre" element={<Board />} />
                    <Route path=":genre/write" element={<PrivateRoute RouteComponent={Write} />} />
                    <Route path=":genre/:id" element={<h2>aa</h2>} />
                </Routes>
            </Content >
        </GenreBoardContextProvider>
    );
}

export default Index;