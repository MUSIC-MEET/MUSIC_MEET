
import MusicCommentType from "pages/Music/View/MusicCommentType";
import customAxios from "../../customAxios";

const fetchMusicCommentList = 
    ({ 
        musicNum
    }: {musicNum: string;}): Promise<MusicCommentType[]> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/music/comment/${musicNum}`,
        }).then(res => res.data);
    };


export default fetchMusicCommentList ;