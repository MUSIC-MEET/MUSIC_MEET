import Content from "components/UI/Content";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Id from "./ID/Id";
import Password from "./Password/Password";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

const Index = () => {
    const navigate = useNavigate();
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    useEffect(() => {
        if (isLogIn) {
            navigate("/");
        }
    }, [isLogIn, navigate]);

    return (
        <Content css={css`p { margin-bottom: 1rem;}`}>
            <Routes>
                <Route path="id" element={<Id />} />
                <Route path="pw" element={<Password />} />
                <Route path="*" element={"xx"} />
            </Routes>
        </Content >
    );

};

export default Index;