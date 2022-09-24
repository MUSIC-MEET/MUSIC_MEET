import { AxiosResponse } from "axios";
import customAxios from "utils/customAxios";

const writeComment = 
    ({ 
        musicNum
    }: {musicNum: string;}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "PUT",
            headers: {
                authorization: `${token}`,
            },
            data: {
                musicNum,
            },
            url: `/music/vote`,
        });
    };


export default writeComment ;