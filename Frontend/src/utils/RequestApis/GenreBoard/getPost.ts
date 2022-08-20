import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const getPost = 
    ({ 
        genre, num
    }: {genre: string; num: string;}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "GET",
            url: `/board/${genre}/${num}`,
            headers: {
                authorization: `${token}`,
            },
        });
    };


export default getPost;