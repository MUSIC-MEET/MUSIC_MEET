import React from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "./Logout/Logout";
import MyPage from "./MyPage/MyPage";
import ResetPassWord from "./ResetPassWord/ResetPassWord";
import PrivateRoute from "components/common/PrivateRoute";
function Index() {
    return (
        <div>
            <Routes>
                <Route path="resetpw/:key" element={<ResetPassWord />} />
                <Route path="resetpw" element={<ResetPassWord />} />
                <Route path="mypage"
                    element={
                        <PrivateRoute RouteComponent={MyPage} />
                    }
                />
                <Route path="logout" element={<Logout />} />
            </Routes>
        </div>
    );
}

export default Index;