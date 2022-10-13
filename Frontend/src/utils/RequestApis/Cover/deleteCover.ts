
import customAxios from "../../customAxios";
import { AxiosResponse } from "axios";

const deleteCover =
    (id: string): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "DELETE",
            url: `/cover/${id}`,
            headers: {
                "authorization": `${token}`
            }
        });
    };
    
export default deleteCover;