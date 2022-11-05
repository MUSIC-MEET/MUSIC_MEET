import customAxios from "../../customAxios";
import PlayListMusicType from "Types/PlayListMusicType";

const deleteMusic = (index: number): Promise<PlayListMusicType[]> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "DELETE",
        url: `/playlist/${index}`,
        headers: {
            authorization: `${token}`,
        },
    }).then(res => {
        console.log(res.data);
        return res.data;
    });
};

export default deleteMusic;