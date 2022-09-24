import customAxios from "../../customAxios";
import MusicType from "pages/Music/MusicType";
const fetchMusicCommentList = 
    ({ 
        musicNum
    }: {musicNum: string;}): Promise<MusicType> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/music/comment/${musicNum}`,
        }).then(res => res.data);
    };


export default fetchMusicCommentList ;