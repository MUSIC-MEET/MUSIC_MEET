import { PostType } from "pages/GenreBoard/View/Post";
import customAxios from "../../customAxios";

const getEditPost = 
    ({ 
        genre, num
    }: {genre: string; num: string;}): Promise<PostType> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/board/${genre}/${num}/small`,
        }).then(response => {
            return response.data;
        });
    };


export default getEditPost;