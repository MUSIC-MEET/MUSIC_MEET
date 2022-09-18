import { PostType } from "pages/GenreBoard/PostType";
import customAxios from "../../customAxios";

const getPosts = 
    ({ 
        genre, page
    }: {genre: string; page: number;}): Promise<PostType[]> => {
        const axios = customAxios();

        return axios({
            method: "GET",
            url: `/boards/${genre}/${page}`,
        }).then(res => res.data);
    };


export default getPosts;