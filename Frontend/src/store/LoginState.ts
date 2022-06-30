import { atom, selector } from "recoil";

interface TLoginState { 
    isLogIn: boolean;
    key: string,
    nickname: string
}

const State = atom<TLoginState>({
    key: "loginState",
    default: {
        isLogIn: false,
        key: "",
        nickname: "",
    },
});

const LoginState = selector<TLoginState>({
    key: "LoginState",
    get: ({ get }) => {
        const state = get(State);
        if(!state.isLogIn) {
            if( sessionStorage.getItem("isLogIn") === "true" && 
                sessionStorage.getItem("token") && 
                sessionStorage.getItem("nickname")
            ) {
                return {
                    isLogIn: true,
                    key: sessionStorage.getItem("key") as string,
                    nickname: sessionStorage.getItem("nickname") as string,
                };
            }
        }
        return state;
    },
    set: ({ set }, newValue) => {
        set(State, newValue);
    }
});

export default LoginState;

export { TLoginState };