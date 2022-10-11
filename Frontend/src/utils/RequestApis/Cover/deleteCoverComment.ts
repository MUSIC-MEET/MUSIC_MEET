
import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

const deleteCoverComment =
    (id: string): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "DELETE",
            url: `/cover/comment/${id}`,
            headers: {
                "authorization": `${token}`
            }
        });
    };

export default deleteCoverComment;