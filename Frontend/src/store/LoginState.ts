import { atom, DefaultValue, selector } from "recoil";

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
            if( localStorage.getItem("isLogIn") === "true" && 
                localStorage.getItem("token") && 
                localStorage.getItem("nickname")
            ) {
                return {
                    isLogIn: true,
                    key: localStorage.getItem("token") as string,
                    nickname: localStorage.getItem("nickname") as string,
                };
            }
        } 
        
        return state;
    },
    set: ({ set }, newValue) => {
        set(State, newValue instanceof DefaultValue ? 
            ({
                isLogIn: false,
                key: "",
                nickname: ""
            }) : newValue);
    }
});

export default LoginState;

export { TLoginState };