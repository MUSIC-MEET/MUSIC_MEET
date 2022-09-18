
import { PostType } from "pages/GenreBoard/PostType";
import customAxios from "../../customAxios";

const getSearchList = 
    ({ 
        genre, type, keyword
    }: {genre: string; type: string; keyword: string;}): Promise<PostType[]> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/board/search/${genre}/${type}/${keyword}`,
        }).then(res => res.data);
    };


export default getSearchList;