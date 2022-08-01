import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

const getChartList = 
    ({ service, rank } : {service: string, rank: string})
    : Promise<AxiosResponse> => {
        const axios = customAxios();
        return axios({
            method: "GET",
            url: `/livechart/${service}/${rank}`,
        });
    };


export default getChartList;