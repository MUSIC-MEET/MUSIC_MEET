import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const write = 
    (
        { genre, title, content }
        : { genre: string, title: string, content: string }
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        console.log(title, content);
        return axios({
            method: "POST",
            url: `/board`,
            headers: {
                "authorization": `${token}`
            },
            data: {
                genre,
                title,
                content
            }
        });
    };


export default write;