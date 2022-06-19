import { atom } from "recoil";

const LoginModalShownState = atom({
    key: "LoginModalShownState ",
    default: false
});

export default LoginModalShownState;