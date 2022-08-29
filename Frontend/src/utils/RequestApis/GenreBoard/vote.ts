import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const vote = 
    ( 
        { genre, num, type } : {genre: string, num: string, type: "upvote" | "downvote"}
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "PUT",
            url: `/board/vote`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                genre,
                boardNum: num,
                vote: type
            }
        });
    };


export default vote;