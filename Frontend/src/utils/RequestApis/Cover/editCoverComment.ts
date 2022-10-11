
import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

const editCoverComment =
    ({ id, comment }
    : {id: string, comment: string}
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "PUT",
            url: `/cover/comment/${id}`,
            headers: {
                "authorization": `${token}`
            },
            data: {
                comment
            }
        });
    };

export default editCoverComment;