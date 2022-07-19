import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

interface LoginData {
    values: {
        id: string;
        pw: string;
    }
}
const LoginRequest= (data: LoginData): Promise<AxiosResponse> => {
    const { id, pw } = data.values;
    const axios = customAxios();
    return axios({
        method: "POST",
        url: "/user/login",
        data: {
            id,
            pw
        }
    });
};

export default LoginRequest;