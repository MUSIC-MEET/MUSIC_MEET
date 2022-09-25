import customAxios from "../../customAxios";
import LatestEvaluationMusic from "pages/User/MyPage/LatestEvaluationType";

const fetchEvaluation = (): Promise<LatestEvaluationMusic[]> => {
    const axios = customAxios();
    const token = localStorage.getItem("token") ?? "";
    return axios({
        method: "GET",
        url: "/user/evaluation",
        headers: {
            authorization: token
        }
    }).then(res => res.data);
};

export default fetchEvaluation;