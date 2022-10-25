import Post from "pages/Main/GenreBoard/Post";
import customAxios from "utils/customAxios";

const fetchPopularPosts = 
    ({ 
        genre, count
    }: {genre: string, count: number}): Promise<Post[]> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/boards/${genre}/popular/${count}`,
        }).then(res=> res.data);
    };


export default fetchPopularPosts;