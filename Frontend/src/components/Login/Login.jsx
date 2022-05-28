/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import LoginForm from "./LoginForm";
import { useState } from "react";
import ThemeContext from "store/ThemeContext";

function Login(props) {
    const { t } = useTranslation("menu");
    const ctx = useContext(ThemeContext);
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
                        onClose={onCloseLoginModal}
                        navigator={props.navigator}
                    />
                </Modal>
            }
            <span 
                css={css`color: ${ctx.themeStyle.menu.login.fontColor};`}
                onClick={onOpenLoginModal}
            >{t("login")}</span>
            <span 
                css={css`color: ${ctx.themeStyle.menu.login.fontColor}; margin-top: 1rem;`}
                onClick={onOpenLoginModal}
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