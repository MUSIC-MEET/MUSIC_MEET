import axios from "axios";


function customAxios() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Pragma"] = "no-cache";
    axios.defaults.headers.common["Cache-Control"] = "no-cache";
    return axios;
}

export default customAxios;