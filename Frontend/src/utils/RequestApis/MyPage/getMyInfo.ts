import customAxios from "../../customAxios";
import MyInfoType from "pages/User/MyPage/MyInfoType";

const getMyInfo = (): Promise<MyInfoType> => {
    const axios = customAxios();
    const token = localStorage.getItem("token") ?? "";
    return axios({
        method: "GET",
        url: "/user/myinfo",
        headers: {
            authorization: token
        }
    }).then(res => res.data);
};

export default getMyInfo;