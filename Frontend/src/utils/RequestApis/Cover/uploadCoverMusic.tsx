
import customAxios from "../../customAxios";
import CoverType from "../../../pages/Cover/CoverType";
import { AxiosResponse } from "axios";

const uploadCoverMusic =
    ({
        title, description, mp3File
    }: CoverType): Promise<AxiosResponse> => {
        const token = localStorage.getItem("token");
        const axios = customAxios();
        return axios({
            method: "POST",
            url: `/cover`,
            headers: {
                "Content-Type": "multipart/form-data",
                "authorization": `${token}`
            },
            data: {
                title,
                description,
                mp3File
            }
        });
    };

export default uploadCoverMusic;