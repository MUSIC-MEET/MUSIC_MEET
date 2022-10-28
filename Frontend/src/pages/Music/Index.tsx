import React, { Suspense, useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Loading from "components/common/Loading";
import ErrorBoundary from "./ErrorBoundary";


import View from "./View/View";
/**
 * 음악 페이지 메인
 * @returns 
 */
function Index() {

    return (
        <React.Fragment>

            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path=":musicNum" element={<View />} />
                        <Route path="list" element={<h1>list</h1>} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </React.Fragment>
    );
}


export default Index;