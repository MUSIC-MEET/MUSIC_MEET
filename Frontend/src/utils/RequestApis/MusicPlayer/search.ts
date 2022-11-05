import customAxios from "../../customAxios";
import PlayListSearchItem from "Types/PlayListSearchItem";

const search = (keyword: string): Promise<PlayListSearchItem[]> => {
    const axios = customAxios();
    return axios({
        method: "GET",
        url: `/playlist/search/${keyword}`,
    }).then(res => res.data);
};

export default search;