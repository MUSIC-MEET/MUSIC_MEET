import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const getList = 
    ({ 
        keyword
    }: {keyword: string}): Promise<AxiosResponse> => {
        const axios = customAxios();

        return axios({
            method: "GET",
            url: `/music/search/${keyword}`,
        });
    };


export default getList;