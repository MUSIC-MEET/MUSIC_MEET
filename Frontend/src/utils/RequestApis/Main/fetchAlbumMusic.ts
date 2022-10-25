import MusicType from "pages/Main/MusicType";
import customAxios from "utils/customAxios";

const fetchAlbumMusic = 
    ({ 
        type, count
    }: {type: "latest" | "popular"; count: number}): Promise<MusicType[]> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/music/${type}/${count}`,
        }).then(res=> res.data);
    };


export default fetchAlbumMusic;