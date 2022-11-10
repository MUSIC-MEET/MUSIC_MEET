
import { PostType } from "pages/GenreBoard/PostType";
import customAxios from "../../customAxios";

const getSearchList = 
    ({ 
        genre, type, keyword, page
    }: {genre: string; type: string; keyword: string; page: number;})
    : Promise<{ data:PostType[], endPage: number, currentPage: number}> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/boards?genre=${genre}&type=${type}&keyword=${keyword}&page=${page}`,
        }).then(res => {
            return {
                data: res.data.boards,
                endPage: res.data.endPage,
                currentPage: page
            };
        });
    };


export default getSearchList;