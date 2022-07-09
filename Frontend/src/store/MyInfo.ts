import { selector } from "recoil";
import LoginState from "./LoginState";
import customAxios from "../utils/customAxios";

const MyInfo = selector({
    key: "getMyInfo",
    get: async ({ get }) => {
        const { key }  = get(LoginState);

        // suspense test 
        return new Promise<any>(resolve => {
            setTimeout(() => {
                console.log("fetched user");
                resolve({
                    //
                });
            }, 3000);
        });

        // real code 
        const axios = customAxios();
        return new Promise<any>((resolve, reject) => {
            axios({
                method: "GET",
                url: "/user/me",
                headers: {
                    authorization: key
                }
            })
                .then((res) => {
                    resolve(res.data);
                });
        });
    }
});

export default MyInfo;