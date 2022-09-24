import { AxiosResponse } from "axios";
import customAxios from "utils/customAxios";

const deleteComment = 
    ({ 
        commentNum
    }: {commentNum: string;}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "DELETE",
            headers: {
                authorization: `${token}`,
            },
            data: {
                commentNum,
            },
            url: `/music/comment`,
        });
    };


export default deleteComment ;