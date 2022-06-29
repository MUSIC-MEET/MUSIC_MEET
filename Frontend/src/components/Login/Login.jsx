import React, { useCallback, useContext } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import LoginForm from "./LoginForm";
import { useState } from "react";
import ThemeContext from "store/ThemeContext";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import LoginFormState from "../../store/LoginForm";
import LoginModalShownState from "store/LoginModalShown";
import  useAxios  from "hooks/use-Axios";
import LoginState from "../../store/LoginState";


function Login(props) {
    const { t } = useTranslation("menu");
    const ctx = useContext(ThemeContext);
    const [formShown, setformShown] = useRecoilState(LoginModalShownState);
    const [keepLoginState, setKeepLoginState] = useState(false);
    const setLoginState = useSetRecoilState(LoginState);
    const values = useRecoilValue(LoginFormState);

    const { status, fetchData } = useAxios({
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



    const loginHandler = useCallback(() => {
        fetchData().then((res) => {
            if (res.status === 201) {
                setLoginState({ isLogin: true, key: res.data.key, nickname: res.data.nickname });
                if (keepLoginState) {
                    localStorage.setItem("keepLogin", true);
                }
                onCloseLoginModal();
            }
        });
    },[fetchData, keepLoginState, onCloseLoginModal, setLoginState]);

    return (    
        <div css={[style]}>
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
            <span 
                css={css`color: ${ctx.themeStyle.menu.login.fontColor};`}
                onClick={onOpenLoginModal}
            >{t("login")}</span>
            <span 
                css={css`color: ${ctx.themeStyle.menu.login.fontColor}; margin-top: 1rem;`}
                onClick={() => props.navigator("/signup")}
            >{t("signup")}</span>
        </div>
    );
}

const style=css`
    display: flex;
    flex-direction: column;
    border-top: 3px solid #555555;
    border-bottom: 3px solid #555555;
    padding: 0.8rem 0;
    & > span {
        cursor: pointer;
    }
`;

export default Login;
