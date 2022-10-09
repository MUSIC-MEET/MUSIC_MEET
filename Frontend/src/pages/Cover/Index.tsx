import Content from "components/UI/Content";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Upload from "./Upload/Upload";
import PrivateRoute from "components/common/PrivateRoute";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "components/common/Loading";
/**
 * /Cover Route Component
 * @returns 
 */
function Index() {
    return (
        <Content>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="upload" element={
                            <PrivateRoute RouteComponent={Upload} />
                        }
                        />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </Content >
    );
}

export default Index;