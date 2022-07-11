import axios from "axios";


function customAxios() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    return axios;
}

export default customAxios;