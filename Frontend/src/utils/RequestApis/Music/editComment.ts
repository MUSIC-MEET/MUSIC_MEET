import { AxiosResponse } from "axios";
import customAxios from "utils/customAxios";

const editComment = 
    ({ 
        commentNum, newComment
    }: {commentNum: string; newComment: string}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "PUT",
            headers: {
                authorization: `${token}`,
            },
            data: {
                commentNum,
                content: newComment
            },
            url: `/music/comment`,
        });
    };


export default editComment ;