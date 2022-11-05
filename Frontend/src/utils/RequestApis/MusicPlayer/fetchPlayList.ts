import customAxios from "../../customAxios";
import PlayListMusicType from "Types/PlayListMusicType";

const fetchPlayList = (): Promise<PlayListMusicType[]> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "GET",
        url: "/playlist",
        headers: {
            authorization: `${token}`,
        }
    }).then(res => {
        console.log(res.data);
        return res.data;
    });
};

export default fetchPlayList;