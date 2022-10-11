
import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

const editComment =
    (id: string): Promise<AxiosResponse> => {
        const axios = customAxios();
        return axios({
            method: "PUT",
            url: `/cover/comment/${id}`,
        });
    };

export default editComment;