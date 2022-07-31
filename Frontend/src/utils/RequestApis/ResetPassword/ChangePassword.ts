import customAxios from "../../customAxios";

const changePassword = async ({ key, password }: { key?: string | null, password: string} ): Promise<any> => {
    const axios = customAxios();
    const token = localStorage.getItem("token");
    if(token) {
        return axios({
            method: "PATCH",
            url: `/user/password`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                newPw: password
            }
        });
    }
    else {
        return axios({
            method: "PATCH",
            url: `/user/password`,
            data: {
                encoding_value: key,
                newPw: password
            }
        });
    }
        
};

export default changePassword;