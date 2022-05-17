/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

function Login() {
    const { t } = useTranslation("menu");
    return (    
        <div css={[style]}>
            <span>{t("login")}</span>
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