import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const uploadImg = 
    ( 
        image: Blob 
    ): Promise<AxiosResponse> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "POST",
            url: `/board/image`,
            headers: {
                authorization: `${token}`,
                "Content-Type": "multipart/form-data",
            },
            data: {
                image
            }
        });
    };


export default uploadImg;