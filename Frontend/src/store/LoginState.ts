import { atom } from "recoil";

const LoginState = atom({
    key: "LoginState",
    default: {
        isLogin: false,
        key: "",
        nickname: "",
    },
});

export default LoginState;