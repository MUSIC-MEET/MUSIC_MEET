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
import { useQuery } from "react-query";
import LoginRequest from "../../utils/RequestApis/Login/LoginRequest";



function addStorage(res) {
    localStorage.setItem("isLogIn", "true");
    localStorage.setItem("token", res.token);
    localStorage.setItem("nickname", res.nickname);
}
function Login(props) {
    const ctx = useContext(ThemeContext);
    const [formShown, setformShown] = useRecoilState(LoginModalShownState);
    const [errorStatus, setErrorStatus] = useState("");
    const [keepLoginState, setKeepLoginState] = useState(false);
    const { isLogIn } = useRecoilValue(LoginState);
    const setLoginState = useSetRecoilState(LoginState);
    const values = useRecoilValue(LoginFormState);
    const { refetch } = useQuery(
        "/user/login", () => LoginRequest({ values }), 
        { 
            onSettled: (res) => {
                const { token, nickname } = res.data;
                setLoginState({ isLogIn: true, key: token, nickname: nickname });
                addStorage(res);
                if (keepLoginState) {
                    localStorage.setItem("keepLoginState", true);
                }
                onCloseLoginModal();
            },
            onError: (err) => {
                setErrorStatus(err.response.status);
                console.log(err.response.status);
            },
            enabled: false, 
            suspense: false,
            retry: 0
        }
    );
    useEffect(()=> {
        //
    },[isLogIn]);

    const changeKeepLoginStateHandler = useCallback(() => {
        setKeepLoginState((prevState) => !prevState);
    },[]);

    const onOpenLoginModal = useCallback(() => {
        setformShown(true);
    },[setformShown]);

    const onCloseLoginModal = useCallback(() => {
        setformShown(false);
    },[setformShown]);


    const loginHandler = useCallback(() => {
        refetch();
    },[refetch]);

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
                        errorStatus={errorStatus}
                    />
                </Modal>
            }
            {/* 로그인 여부에 따라 메뉴 로그인란에 다르게 보이기*/}
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
