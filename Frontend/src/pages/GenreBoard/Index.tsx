import Content from "components/UI/Content";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "./Board/Board";
import Write from "./Write/Write";
import View from "./View/View";

import PrivateRoute from "components/common/PrivateRoute";
import GenreBoardContextProvider from "store/GenreBoardContextProvider";
import GenreBoardViewerContextProvider from "store/GenreBoardViewerContextProvider";

function Index() {
    return (

        <Content>
            <GenreBoardContextProvider>
                <Routes>
                    <Route path="/" element={<Board />} />
                    <Route path="/:genre" element={<Board />} />
                    <Route path=":genre/write" element={<PrivateRoute RouteComponent={Write} />} />
                </Routes>
            </GenreBoardContextProvider>
            <GenreBoardViewerContextProvider>
                <Routes>
                    <Route path=":genre/:num" element={<View />} />
                </Routes>
            </GenreBoardViewerContextProvider>

        </Content >

    );
}

export default Index;