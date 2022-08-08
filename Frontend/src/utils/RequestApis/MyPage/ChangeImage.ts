import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const changeIamge = (image: Blob | string): Promise<AxiosResponse> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    return axios({
        method: "PUT",
        url: "/user/image",
        headers: {
            authorization: `${token}`,
            "Content-Type": "multipart/form-data",
        },
        data: {
            image: image
        }
    });
};

export default changeIamge;