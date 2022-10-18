import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/common/PrivateRoute";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "components/common/Loading";

import Upload from "./Upload/Upload";
import View from "./View/View";
import Edit from "./Edit/Edit";
/**
 * /Cover Route Component
 * @returns 
 */
function Index() {
    return (
        <React.Fragment>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="upload" element={
                            <PrivateRoute RouteComponent={Upload} />
                        } />
                        <Route path="edit/:id" element={
                            <PrivateRoute RouteComponent={Edit} />
                        } />
                        <Route path="view/:id" element={<View />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </React.Fragment >
    );
}

export default Index;