import React, { useCallback, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import Modal from "../UI/Modal";
import LoginForm from "./LoginForm";
import { useState } from "react";
import ThemeContext from "store/ThemeContext";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import LoginFormState from "../../store/LoginForm";
import LoginModalShownState from "store/LoginModalShown";
import  useHttp  from "hooks/use-Http";
import LoginState from "../../store/LoginState";
import NotLoginMenu from "./NotLoginMenu";
import LoginMenu from "./LoginMenu";
import { axios } from "axios";



function addStorage(res) {
    localStorage.setItem("isLogIn", "true");
    localStorage.setItem("token", res.token);
    localStorage.setItem("nickname", res.nickname);
}
function Login(props) {
    const ctx = useContext(ThemeContext);
    const [formShown, setformShown] = useRecoilState(LoginModalShownState);
    const [keepLoginState, setKeepLoginState] = useState(false);
    const { isLogIn } = useRecoilValue(LoginState);
    const setLoginState = useSetRecoilState(LoginState);
    const values = useRecoilValue(LoginFormState);

    useEffect(()=> {
        //
    },[isLogIn]);
    const { status, fetchData } = useHttp({
        method: "POST",
        url: "/user/login",
        body: {
            id: values.id,
            pw: values.pw
        }
    });

    const changeKeepLoginStateHandler = useCallback(() => {
        setKeepLoginState((prevState) => !prevState);
    },[]);

    const onOpenLoginModal = useCallback(() => {
        setformShown(true);
    },[setformShown]);

    const onCloseLoginModal = useCallback(() => {
        setformShown(false);
    },[setformShown]);



    const loginHandler = useCallback(async () => {
        await fetchData().then((res) => {
            setLoginState({ isLogIn: true, key: res.token, nickname: res.nickname });
            addStorage(res);
            // axios.defaults.headers.common["authorization"] = res.token;
            if (keepLoginState) {
                localStorage.setItem("keepLoginState", true);
            }
            onCloseLoginModal();
        });
    },[fetchData, keepLoginState, onCloseLoginModal, setLoginState]);

    return (    
        <article css={[style]}>
            {
                formShown && 
                <Modal onClose={onCloseLoginModal}>
                    <LoginForm 
                        keepLoginState={keepLoginState}
                        onChangeKeepLoginState={changeKeepLoginStateHandler}
                        onClose={onCloseLoginModal}
                        navigator={props.navigator}
                        onLogin={loginHandler}
                        isLoginFail={status.isError}
                    />
                </Modal>
            }
            {
                isLogIn ?
                    <LoginMenu />
                    :
                    <NotLoginMenu 
                        onOpenLoginModal={onOpenLoginModal}
                        fontColor={ctx.themeStyle.menu.login.fontColor}
                        navigator={props.navigator}
                    />
            }
        </article>
    );
}

const style=css`
    border-top: 3px solid #555555;
    border-bottom: 3px solid #555555;
    padding: 0.8rem 0;
    & > span {
        cursor: pointer;
    }
    margin-bottom: 1rem;
    
`;

export default Login;
