import customAxios from "../../customAxios";

const authKeyCheck = async (key: string): Promise<any> => {
    const axios = customAxios();
    return axios({
        method: "GET",
        url: `/auth/pw/${key}`,
    });
};

export default authKeyCheck;