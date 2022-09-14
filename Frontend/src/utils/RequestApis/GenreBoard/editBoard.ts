import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const editBoard = 
    ({ 
        genre, num, title, content
    }: {genre: string; num: string; title: string; content: string;}
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");

        return axios({
            method: "PUT",
            url: `/board`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                genre,
                "boardNum": num,
                title,
                content
            }
        });
    };


export default editBoard;