
import customAxios from "../../customAxios";
import CommentType from "components/common/CommentType";

const fetchCover =
    (id: string): Promise<CommentType[]> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/cover/comment/${id}`,
        }).then(res => res.data);
    };

export default fetchCover;