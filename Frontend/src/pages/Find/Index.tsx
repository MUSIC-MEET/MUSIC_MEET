import Content from "components/UI/Content";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Id from "./ID/Id";
import Password from "./Password/Password";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginState from "store/LoginState";
import CurrentPage from "store/CurrentPage";

const Index = () => {
    const navigate = useNavigate();
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        if (isLogIn) {
            navigate("/");
        }
        setCurrentPage(-1);
    }, [isLogIn, navigate, setCurrentPage]);

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