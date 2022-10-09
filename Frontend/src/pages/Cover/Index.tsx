import Content from "components/UI/Content";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Upload from "./Upload/Upload";
import PrivateRoute from "components/common/PrivateRoute";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "components/common/Loading";
import View from "./View/View";
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
                        <Route path="view/:id" element={<View />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </React.Fragment >
    );
}

export default Index;