import Content from "components/UI/Content";
import React, { Suspense, useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Board from "./Board/Board";
import Write from "./Write/Write";
import View from "./View/View";
import Edit from "./Edit/Edit";
import PrivateRoute from "components/common/PrivateRoute";
import Search from "./Search/Search";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "components/common/Loading";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
function Index() {
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage]);
    return (
        <React.Fragment>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {/* <Route path="/" element={<Board />} /> */}
                        <Route path=":genre" element={<Board />} />
                        <Route path=":genre/write" element={<PrivateRoute RouteComponent={Write} />} />
                        <Route path=":genre/edit/:id" element={<PrivateRoute RouteComponent={Edit} />} />
                        <Route path=":genre/post/:num" element={<View />} />
                        <Route path=":genre/search/:type/" element={<Search />} />
                        <Route path=":genre/search/:type/:keyword" element={<Search />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </React.Fragment>

    );
}

export default Index;