import Post from "pages/Main/GenreBoard/Post";
import customAxios from "utils/customAxios";

const fetchLatestPosts = 
    ({ 
        genre, count
    }: {genre: string, count: number}): Promise<Post[]> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/boards/${genre}/latest/${count}`,
        }).then(res=> res.data);
    };


export default fetchLatestPosts;