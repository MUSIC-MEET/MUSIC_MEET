
import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

/**
 * 커버곡 추천 
 * @param id 글번호
 * @returns 
 */

const voteCover =
    (id: string): Promise<AxiosResponse> => {
        const token = localStorage.getItem("token");
        const axios = customAxios();
        return axios({
            method: "PUT",
            url: `/cover/vote/${id}`,
            headers: {
                "authorization": `${token}`
            },
        });
    };

export default voteCover;