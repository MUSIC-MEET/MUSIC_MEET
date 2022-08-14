import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const write = 
    (
        { genre, title, content }
        : { genre: string, title: string, content: string }
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "POST",
            url: `/genreboard`,
            headers: {
                "Authorization": `${token}`
            },
            data: {
                genre,
                title,
                content
            }
        });
    };


export default write;