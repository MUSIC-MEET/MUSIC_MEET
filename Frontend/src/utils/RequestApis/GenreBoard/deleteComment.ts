import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const deleteComment = 
    ({ 
        genre, commentNum
    }: {genre: string; commentNum: string;}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");

        return axios({
            method: "DELETE",
            url: `/board/comment`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                genre,
                commentNum
            }
        });
    };


export default deleteComment;