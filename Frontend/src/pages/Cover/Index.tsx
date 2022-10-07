import Content from "components/UI/Content";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Upload from "./Upload/Upload";

/**
 * /Cover Route Component
 * @returns 
 */
function Index() {
    return (
        <Content>
            <Routes>
                <Route path="upload" element={<Upload />} />
            </Routes>
        </Content>
    );
}

export default Index;