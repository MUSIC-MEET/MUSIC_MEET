import Content from "components/UI/Content";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Id from "./ID/Id";
import Password from "./Password/Password";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import GuestRoute from "../../components/common/GuestRoute";

const Index = () => {
    const setCurrentPage = useSetRecoilState(CurrentPage);

    useEffect(() => {
        setCurrentPage(-1);
    }, [setCurrentPage]);

    return (
        <React.Fragment>
            <Routes>
                <Route
                    path="id"
                    element={
                        <GuestRoute RouteComponent={Id} />
                    }
                />
                <Route
                    path="pw"
                    element={
                        <GuestRoute RouteComponent={Password} />
                    }
                />
                <Route path="*" element={"xx"} />
            </Routes>
        </React.Fragment>
    );

};

export default Index;