import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

const changeMail = (email: string): Promise<AxiosResponse> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "put",
        url: "/user/email",
        headers: {
            authorization: `${token}`,
        },
        data: {
            email
        }
    });
};

export default changeMail;