import { AxiosResponse } from "axios";
import { PostType } from "pages/GenreBoard/View/Post";
import customAxios from "../../customAxios";

const getPost = 
    ({ 
        genre, num
    }: {genre: string; num: string;}): Promise<PostType> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");

        console.log(`getPost axios ${genre} ${num}`);

        return axios({
            method: "GET",
            url: `/board/${genre}/${num}`,
            headers: {
                authorization: `${token}`,
            },
        }).then(res => res.data);
    };


export default getPost;