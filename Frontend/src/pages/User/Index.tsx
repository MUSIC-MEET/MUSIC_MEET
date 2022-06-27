import React from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import ResetPassWord from "./ResetPassWord";
function Index() {
    return (
        <div>
            <Routes>
                <Route path="resetpw/:key" element={<ResetPassWord />} />
            </Routes>
        </div>
    );
}

export default Index;