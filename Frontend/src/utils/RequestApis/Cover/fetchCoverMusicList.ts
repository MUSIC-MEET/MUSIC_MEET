
import customAxios from "../../customAxios";
import MusicType from "Types/MusicType";

const fetchCoverMusicList =
    ({ page, sort }: {page: number, sort: any;})
    : Promise<{ data: MusicType[]; currentPage: number; endPage: number}> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/cover/list?page=${page}&sort=${sort}`,
        }).then(res => {
            return {
                data: res.data.list,
                currentPage: page,
                endPage: res.data.endPage
            };
        });
    };

export default fetchCoverMusicList;