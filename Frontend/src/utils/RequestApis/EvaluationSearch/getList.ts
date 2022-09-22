
import SearchMusicType from "components/Search/SearchMusicType";
import customAxios from "../../customAxios";

const getList = 
    ({ 
        keyword
    }: {keyword: string}): Promise<SearchMusicType[]> => {
        const axios = customAxios();

        return axios({
            method: "GET",
            url: `/music/search/${keyword}`,
        }).then((res) => res.data);
    };


export default getList;