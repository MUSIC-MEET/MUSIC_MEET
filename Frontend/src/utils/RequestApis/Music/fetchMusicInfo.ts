import MusicType from "Types/MusicType";
import customAxios from "../../customAxios";
const fetchMusicInfo = 
    ({ 
        musicNum
    }: {musicNum: string;}): Promise<MusicType> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "GET",
            headers: {
                authorization: `${token}`,
            },
            url: `/music/${musicNum}`,
        }).then(res => res.data);
    };


export default fetchMusicInfo ;