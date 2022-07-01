import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPage from "./MyPage/MyPage";
import ResetPassWord from "./ResetPassWord/ResetPassWord";
function Index() {
    return (
        <div>
            <Routes>
                <Route path="resetpw/:key" element={<ResetPassWord />} />
                <Route path="mypage" element={<MyPage />} />
            </Routes>
        </div>
    );
}

export default Index;