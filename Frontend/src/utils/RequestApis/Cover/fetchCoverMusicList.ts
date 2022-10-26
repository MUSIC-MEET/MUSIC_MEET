
import customAxios from "../../customAxios";
import MusicType from "components/common/MusicType";

const fetchCoverMusicList =
    (page: number): Promise<{ data: MusicType[]; currentPage: number; endPage: number}> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/cover/list?page=${page}`,
        }).then(res => {
            return {
                data: res.data.list,
                currentPage: page,
                endPage: res.data.endPage
            };
        });
    };

export default fetchCoverMusicList;