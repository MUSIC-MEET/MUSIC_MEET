/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import LoginForm from "./LoginForm";
import { useState } from "react";

function Login() {
    const { t } = useTranslation("menu");
    const [formShown, setformShown] = useState(false);
    const [keepLoginState, setKeepLoginState] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const changeKeepLoginStateHandler = useCallback(() => {
        setKeepLoginState((prevState) => !prevState);
    },[]);

    const onOpenLoginModal = useCallback(() => {
        setformShown(true);
    },[]);

    const onCloseLoginModal = useCallback(() => {
        setformShown(false);
    },[]);

    const changeValuesHandler = useCallback((e) => { 
        setValues((prevState) => {
            return { 
                ...prevState,
                [e.target.name] : e.target.value
            };
        });
    },[]);
    return (    
        <div css={[style]}>
            {
                formShown && 
                <Modal onClose={onCloseLoginModal}>
                    <LoginForm 
                        keepLoginState={keepLoginState}
                        onChangeKeepLoginState={changeKeepLoginStateHandler}
                        values={values}
                        onChangeValues={changeValuesHandler}
                    />
                </Modal>
            }
            <span onClick={onOpenLoginModal}>{t("login")}</span>
        </div>
    );
}

const style=css`
    width: 100%;
    height: 100%;
    border-top: 3px solid gray;
    border-bottom: 3px solid gray;
    padding: 0.8rem 0;
    span {
        cursor: pointer;
    }
`;

export default Login;