import Content from "components/UI/Content";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "./Board/Board";
import Write from "./Write/Write";
import View from "./View/View";
import PrivateRoute from "components/common/PrivateRoute";
import GenreBoardContextProvider from "store/GenreBoardContextProvider";
function Index() {
    return (

        <Content>
            <GenreBoardContextProvider>
                <Routes>
                    <Route path="/" element={<Board />} />
                    <Route path="/:genre" element={<Board />} />
                    <Route path=":genre/write" element={<PrivateRoute RouteComponent={Write} />} />
                    <Route path=":genre/update/:id" element={<PrivateRoute RouteComponent={Write} />} />
                </Routes>
            </GenreBoardContextProvider>

            <Routes>
                <Route path=":genre/post/:num" element={<View />} />
            </Routes>
        </Content >

    );
}

export default React.memo(Index);