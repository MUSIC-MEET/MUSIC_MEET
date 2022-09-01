import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const voteComment = 
    ( 
        { genre, commentNum, type } : {genre: string, commentNum: string, type: "upvote" | "downvote"}
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "PUT",
            url: `/board/comment/vote`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                genre,
                commentNum,
                vote: type
            }
        });
    };


export default voteComment;