import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
ReactDOM.render(
    <Router>
        <App/>
    </Router>
    , document.getElementById("root"));


axios.defaults.baseURL = process.env.REACT_APP_API_URL;