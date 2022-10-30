
import MusicType from "Types/MusicType";
import customAxios from "../../customAxios";


const fetchCover =
    (id: string): Promise<MusicType> => {
        const token = localStorage.getItem("token");
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/cover/${id}`,
            headers: {
                "authorization": `${token}`
            },
        }).then(res => res.data);
    };

export default fetchCover;