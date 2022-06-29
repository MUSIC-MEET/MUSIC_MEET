import { atom } from "recoil";

interface TLoginState { 
    isLogIn: boolean;
    key: string,
    nickname: string
}

const LoginState = atom<TLoginState>({
    key: "LoginState",
    default: {
        isLogIn: false,
        key: "",
        nickname: "",
    },
});

export default LoginState;

export { TLoginState };