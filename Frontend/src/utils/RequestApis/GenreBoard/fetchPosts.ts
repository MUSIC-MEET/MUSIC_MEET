import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const fetchPosts = 
    ({ 
        genre, page
    }: {genre: string; page: string;}
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/board/${genre}/${page}`,
        }).then(res => res?.data);

    };


export default fetchPosts;