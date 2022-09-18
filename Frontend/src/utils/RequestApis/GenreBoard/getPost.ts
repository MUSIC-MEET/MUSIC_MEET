import { PostContentType } from "pages/GenreBoard/View/PostContentType";
import customAxios from "../../customAxios";

const getPost = 
    ({ 
        genre, num
    }: {genre: string; num: string;}): Promise<PostContentType> => {
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