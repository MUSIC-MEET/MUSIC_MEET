import { atom } from "recoil";

const LoginFormState = atom({
    key: "LoginFormState",
    default: {
        id: "",
        pw: ""
    }
});

export default LoginFormState;