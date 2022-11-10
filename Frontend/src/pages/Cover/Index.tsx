import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/common/PrivateRoute";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "components/common/Loading";

import NotFound from "pages/NotFound/Index";

import Upload from "./Upload/Upload";
import View from "./View/View";
import Edit from "./Edit/Edit";
import List from "./List/List";
import Search from "./Search/Search";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
/**
 * /Cover Route Component
 * @returns 
 */
function Index() {
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(4);

    }, [setCurrentPage]);
    return (
        <React.Fragment>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="search/" element={<Search />} />
                        <Route path="search/:type/:keyword" element={<Search />} />
                        <Route path=":id" element={<View />} />
                        <Route path="upload" element={
                            <PrivateRoute RouteComponent={Upload} />
                        } />
                        <Route path="edit/:id" element={
                            <PrivateRoute RouteComponent={Edit} />
                        } />
                        <Route path="list" element={<List />} />
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </React.Fragment >
    );
}

export default Index;