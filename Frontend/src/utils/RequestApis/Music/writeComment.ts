import { AxiosResponse } from "axios";
import customAxios from "utils/customAxios";

const writeComment = 
    ({ 
        musicNum, comment
    }: {musicNum: string; comment:string;}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "POST",
            headers: {
                authorization: `${token}`,
            },
            data: {
                musicNum,
                content: comment
            },
            url: `/music/comment`,
        }).then(res => res.data);
    };


export default writeComment ;