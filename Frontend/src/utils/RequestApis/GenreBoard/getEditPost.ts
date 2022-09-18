
import { PostContentType } from "pages/GenreBoard/View/PostContentType";
import customAxios from "../../customAxios";

const getEditPost = 
    ({ 
        genre, num
    }: {genre: string; num: string;}): Promise<PostContentType> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/board/${genre}/${num}/small`,
        }).then(response => {
            return response.data;
        });
    };


export default getEditPost;