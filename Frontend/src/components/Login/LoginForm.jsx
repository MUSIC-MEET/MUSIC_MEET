/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Input from "components/common/Input";
import Title from "components/common/Title";
import Submit from "components/common/Submit";
import SubMenu from "./SubMenu";
import LoginStateToggle from "./LoginStateToggle";

function LoginForm(props) {
    const { 
        keepLoginState, 
        onChangeKeepLoginState, 
        values, 
        onChangeValues, 
        onClose, 
        navigator,
        onLogin
    } = props;
    const { id, pw } = values || "";
    const { t } = useTranslation("loginForm");

    const onClickSignUp = useCallback(() => {
        navigator("/signup");
        onClose();
    },[navigator, onClose]);
    
    const onSubmit = useCallback((event) => {
        event.preventDefault();
        console.log("로그인버튼");
        onLogin();
    },[onLogin]);
    const disabled = id.length === 0 || pw.length === 0;
    return (
        <article css={[style]}>
            <Title>{t("title")}</Title>
            <form css={css`width: 20rem; margin: 2.5rem 0;`} onSubmit={onSubmit}>
                <Input
                    input = {{
                        value: id,
                        type: "text",
                        placeholder: t("id"),
                        name: "id",
                        onChange: onChangeValues
                    }}
                />
                <Input 
                    input = {{
                        value: pw,
                        type: "password",
                        placeholder: t("password"),
                        name: "pw",
                        onChange: onChangeValues
                    }}
                />
                <LoginStateToggle 
                    text={t("keepLoginState")}
                    state={keepLoginState}
                    onChangeState={onChangeKeepLoginState}
                />
                <Submit 
                    type="submit" 
                    value={t("title")}
                    disabled={disabled}
                />
                <SubMenu 
                    onClickSignUp={onClickSignUp}
                    textSignUp={t("signup")}
                    textFindId={t("findId")}
                    textFindPw={t("findPw")}
                />
            </form>
        </article>
    );
}


const style =  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
        

    & > form {
        display:flex;
        flex-direction: column;
        width: 20rem;
    }

    & > form > input {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }

    & > form > button {
        height: 2.5rem;
        cursor: pointer;
    }
    

    
`;
export default LoginForm;