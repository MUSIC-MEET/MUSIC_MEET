import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

const getMyInfo = async (): Promise<any> => {
    const axios = customAxios();
    const token = localStorage.getItem("token") ?? "";
    return axios({
        method: "GET",
        url: "/user/myinfo",
        headers: {
            authorization: token
        }
    });
};

export default getMyInfo;