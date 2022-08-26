import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const deleteBoard = 
    ({ 
        genre, num
    }: {genre: string; num: string;}): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");

        return axios({
            method: "DELETE",
            url: `/board`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                genre,
                "boardNum": num
            }
        });
    };


export default deleteBoard;