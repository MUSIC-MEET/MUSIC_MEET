import customAxios from "../../customAxios";

const ChangeNicknameRequest = (nickname: string) => {
    const token = localStorage.getItem("token");
    const axios = customAxios();
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: "/user/nickname",
            headers: {
                authorization: `${token}`,
            },
            data: {
                nickname
            }
        })
            .then((res) => 
                resolve(res)
            )
            .catch((err) => 
                reject(err)
            );
    });
};

export default ChangeNicknameRequest;