import { PostType } from "pages/GenreBoard/PostType";
import customAxios from "../../customAxios";

const getPosts = 
    ({ 
        genre, page
    }: {genre: string; page: number;}): Promise<{ data: PostType[]; currentPage: number}> => {
        const axios = customAxios();
        console.log(genre, page,"request");
        return axios({
            method: "GET",
            url: `/boards/${genre}/${page}`,
        }).then(res => {
            return {
                data: res.data,
                currentPage: page
            };
        });
    };


export default getPosts;