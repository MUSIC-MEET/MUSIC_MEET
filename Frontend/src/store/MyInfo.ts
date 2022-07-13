import { selector } from "recoil";
import LoginState from "./LoginState";
import customAxios from "../utils/customAxios";

const MyInfo = selector({
    key: "getMyInfo",
    get: async ({ get }) => {
        const { key }  = get(LoginState);
        const axios = customAxios();
        const data = await axios({
            method: "GET",
            url: "/user/myinfo",
            headers: {
                authorization: key
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    throw "401";
                }
            });
        return data;
    }
});

export default MyInfo;