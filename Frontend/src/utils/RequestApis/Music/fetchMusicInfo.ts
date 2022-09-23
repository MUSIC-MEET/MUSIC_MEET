import customAxios from "../../customAxios";
import MusicType from "pages/Music/MusicType";
const fetchMusicInfo = 
    ({ 
        musicNum
    }: {musicNum: string;}): Promise<MusicType> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/music/${musicNum}`,
        }).then(res => res.data);
    };


export default fetchMusicInfo ;