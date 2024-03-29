import React, { useCallback, useEffect } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import SubMenu from "./SubMenu";
import LoginStateToggle from "./LoginStateToggle";
import LoginFormState from "../../store/LoginForm";
import { useRecoilState } from "recoil";
import Error from "../common/Error";
import Logo  from "components/common/Logo";

function LoginForm(props) {
    const { 
        keepLoginState, 
        onChangeKeepLoginState, 
        onLogin,
        errorStatus
    } = props;
    const [values, setValues] = useRecoilState(LoginFormState);
    const { id, pw } = values || "";
    const { t } = useTranslation("loginForm");

    useEffect(() => {
        //
    },[errorStatus]);


    const onChangeValues = useCallback((e) => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
    },[setValues]);

    
    const onSubmit = useCallback((event) => {
        event.preventDefault();
        onLogin();
    },[onLogin]);




    const disabled = id.length === 0 || pw.length === 0;
    return (
        <article css={[style]}>
            <Logo />
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
                {errorStatus===400 && <Error>{t("error.notmatch")}</Error>}
                {errorStatus===401 && <Error>{t("error.email")}</Error>}
                <Submit 
                    type="submit" 
                    value={t("title")}
                    disabled={disabled}
                />
                <SubMenu 
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
        
    & > .title {
        margin-top: 1rem;
    }
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
    

    b {
        text-align: center;
    }

    & > .logo {
        width: 15rem;
        height: 6rem;
    }
    
`;
export default React.memo(LoginForm);
