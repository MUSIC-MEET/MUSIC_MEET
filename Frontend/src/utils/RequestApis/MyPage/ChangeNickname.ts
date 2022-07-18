import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const chnageNickname = (nickname: string): Promise<AxiosResponse> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "put",
        url: "/user/nickname",
        headers: {
            authorization: `${token}`,
        },
        data: {
            nickname
        }
    });
};

export default chnageNickname;