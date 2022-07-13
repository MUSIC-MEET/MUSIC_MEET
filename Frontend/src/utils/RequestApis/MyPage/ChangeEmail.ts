import customAxios from "../../customAxios";

const ChangeEmailRequest = (email: string) => {
    const token = localStorage.getItem("token");
    const axios = customAxios();
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: "/user/email",
            headers: {
                authorization: `${token}`,
            },
            data: {
                email: email
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

export default ChangeEmailRequest;