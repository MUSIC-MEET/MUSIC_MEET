
import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

/**
 * 커버 음악 댓글 작성 API
 * @param obj.id - cover id
 * @param obj.comment - comment
 * @returns 
 */
const submitComment =
    ({ id, comment }
        : { id: string, comment: string }
    ): Promise<AxiosResponse> => {
        const token = localStorage.getItem("token");
        const axios = customAxios();
        return axios({
            method: "POST",
            url: `/cover/comment`,
            headers: {
                "authorization": `${token}`
            },
            data: {
                uploadNum: id,
                comment
            }
        });
    };

export default submitComment;