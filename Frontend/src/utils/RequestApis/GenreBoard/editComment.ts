import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const editComment = 
    ({ 
        genre, commentNum, newComment
    }: {genre: string, commentNum: string, newComment: string}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "PUT",
            url: `/board/comment`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                genre,
                commentNum,
                content: newComment
            }
        });
    };


export default editComment;