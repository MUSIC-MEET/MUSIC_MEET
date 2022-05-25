/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Input from "components/common/Input";
import { useContext } from "react";
import ThemeContext from "../../store/ThemeContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Title from "components/common/Title";

function LoginForm(props) {
    const { 
        keepLoginState, 
        onChangeKeepLoginState, 
        values, 
        onChangeValues, 
        onClose, 
        navigator
    } = props;
    const { email, password } = values || "";
    const { t } = useTranslation("loginForm");
    const ctx = useContext(ThemeContext);
    const { background, fontColor } = ctx.themeStyle.modal;
    const { borderColor } = ctx.themeStyle.input;

    const onClickSignUp = useCallback(() => {
        navigator("/signup");
        onClose();
    },[navigator, onClose]);
    
    return (
        <div css={[style]}>
            <Title>{t("title")}</Title>
            <form css={css`width: 20rem; margin: 2.5rem 0;`}>
                <Input
                    input = {{
                        value: email,
                        type: "email",
                        placeholder: t("email"),
                        name: "email",
                        onChange: onChangeValues
                    }}
                />
                <Input 
                    input = {{
                        value: password,
                        type: "password",
                        placeholder: t("password"),
                        name: "password",
                        onChange: onChangeValues
                    }}
                />
                <div css=
                    {css`
                        display: flex; 
                        justify-content: flex-start; 
                        align-items: center; 
                        margin-bottom: 2rem;
                        margin-top: 0.2rem;
                        font-size: 0.8rem;
                        label{ margin-left: 0.5rem; font-size:1rem;  cursor: pointer; }
                    `}>
                    {!keepLoginState ? 
                        <CheckCircleOutlineIcon style={{ "cursor": "pointer" }} onClick={onChangeKeepLoginState} /> : 
                        <CheckCircleIcon style={{ "cursor": "pointer" }} onClick={onChangeKeepLoginState}/>}
                    <p 
                        style={{ "cursor": "pointer" }}
                        onClick={onChangeKeepLoginState}
                    >
                        {t("keepLoginState")}</p>
                </div>
                <input type="submit" value={t("title")}
                    css={css`
                        background: ${background};
                        color: ${fontColor};
                        border: 1px solid ${borderColor};
                    `}
                />
                <div css={subMenuStyle}>
                    <div>
                        <span onClick={onClickSignUp}>{t("signup")}</span>
                    </div>
                
                    <div>
                        <span>{t("findId")}</span>
                        <span className={"pw"}>{t("findPw")}</span>
                    </div>
                </div>
            </form>

        </div>
    );
}

const subMenuStyle = css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    div > .pw::before {
        content: " · ";
    }

    span {
        cursor: pointer;
    }
`;

const style =  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    * {
        font-size: 1.2rem;
    }

    & > h1 {
        margin-top: 0.95rem;
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
    

    
`;
export default LoginForm;
