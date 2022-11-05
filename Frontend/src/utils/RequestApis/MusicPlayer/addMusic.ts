import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

const addMusic = (id: number): Promise<AxiosResponse> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "POST",
        url: `/playlist/${id}`,
        headers: {
            authorization: `${token}`,
        },
    });
};

export default addMusic;