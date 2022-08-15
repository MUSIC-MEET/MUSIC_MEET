import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { RecoilRoot } from "recoil";


if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const { worker } = require("./mocks/browser");
    // console.log("msw working");
    // worker.start();
}


ReactDOM.render(
    <RecoilRoot>
        <Router>
            <App/>
        </Router>
    </RecoilRoot>
    , document.getElementById("root"));


axios.defaults.baseURL = process.env.REACT_APP_API_URL;