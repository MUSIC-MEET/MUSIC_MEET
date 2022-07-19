import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const chnageImage= (image: string): Promise<AxiosResponse> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "put",
        url: "/user/image",
        headers: {
            authorization: `${token}`,
            "Content-type" : "multipart/form-data"
        },
        data: {
            image
        }
    });
};

export default chnageImage;