
import customAxios from "../../customAxios";
import CoverType from "../../../pages/Cover/CoverType";
import { AxiosResponse } from "axios";

const editCoverMusic =
    ({
        title, description, mp3File, fileName, id
    }: CoverType): Promise<AxiosResponse> => {
        const token = localStorage.getItem("token");
        const axios = customAxios();
        return axios({
            method: "PUT",
            url: `/cover/${id}`,
            headers: {
                "Content-Type": "multipart/form-data",
                "authorization": `${token}`
            },
            data: {
                title,
                description,
                mp3File,
                fileName
            }
        });
    };

export default editCoverMusic;