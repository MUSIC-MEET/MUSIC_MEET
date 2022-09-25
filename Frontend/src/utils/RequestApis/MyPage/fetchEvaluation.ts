import customAxios from "../../customAxios";

const fetchEvaluation = async (): Promise<any> => {
    const axios = customAxios();
    const token = localStorage.getItem("token") ?? "";
    return axios({
        method: "GET",
        url: "/user/evalution",
        headers: {
            authorization: token
        }
    });
};

export default fetchEvaluation;