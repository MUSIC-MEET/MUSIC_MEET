
import customAxios from "../../customAxios";
import MusicType from "Types/MusicType";

const fetchSearchList =
    ({ type, keyword, page }: {type: string; keyword: string; page: number})
    : Promise< {data: MusicType[]; currentPage: number; endPage: number;}> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/cover/search?type=${type}&keyword=${keyword}&page=${page}`,
        }).then(res => {
            return {
                data: res.data.list,
                currentPage: page,
                endPage: res.data.endPage
            };
        });
    };

export default fetchSearchList;