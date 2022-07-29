import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const deleteAccount = (password: string): Promise<AxiosResponse> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "DELETE",
        url: "/user",
        headers: {
            authorization: `${token}`,
        },
        data: {
            password
        }
    });
};

export default deleteAccount;