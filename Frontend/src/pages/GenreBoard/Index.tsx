import Title from "components/common/Title";
import Content from "components/UI/Content";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Board from "./Board/Board";

function Index() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    return (
        <Content>
            <Title>{t("title")}</Title>
            <Routes>
                <Route path="/" element={<Board />} />
                <Route path="/:genre" element={<Board />} />
            </Routes>
        </Content>
    );
}

export default Index;