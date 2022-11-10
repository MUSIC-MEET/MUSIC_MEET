import { PostType } from "pages/GenreBoard/PostType";
import customAxios from "../../customAxios";

const getPosts = 
    ({ 
        genre, page
    }: {genre: string; page: number;}): Promise<{ data: PostType[]; currentPage: number; endPage: number}> => {
        const axios = customAxios();

        return axios({
            method: "GET",
            url: `/boards?genre=${genre}&page=${page}`,
        }).then(res => {
            return {
                data: res.data.boards,
                currentPage: page,
                endPage:  res.data.endPage
            };
        });
    };


export default getPosts;