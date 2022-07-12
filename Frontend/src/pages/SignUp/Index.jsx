import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Success from "./Success";
function Index() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/success" element={<Success />} /> 
            </Routes>
        </div>
    );
}

export default Index;