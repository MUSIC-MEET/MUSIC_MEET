/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import Input from "../../components/common/Input";
import { css } from "@emotion/react";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
import Error from "components/common/Error";
import Correct from "components/common/Correct";

function SignUpForm({ values, onChangeValues, onRequest, error }) {
    const { t } = useTranslation("registerPage");
    
    const onSubmit = useCallback((event) => {
        event.preventDefault();
        onRequest();
    },[onRequest]);
    
    return (
        <form css={[formStyle]}  onSubmit={onSubmit}>
            <div>
                <label htmlFor="id">{t("id")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.id || "",
                        type: "text",
                        placeholder: t("placeholder.id"),
                        name: "id",
                        id: "id",
                        onChange: onChangeValues
                    }}
                />
                {error.id ==="invalid" && <Error>{t("errors.id.invalid")}</Error>}
            </div>
                
            <div>
                <label htmlFor="nickname">{t("nickname")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.nickname || "",
                        type: "text",
                        placeholder: t("placeholder.nickname"),
                        name: "nickname",
                        id: "nickname",
                        onChange: onChangeValues
                    }}
                />
                {error.nickname === "invalid" && <Error>{t("errors.nickname.invalid")}</Error>}
            </div>        


            <div>
                <label htmlFor="pw1">{t("password")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.pw1 || "",
                        type: "password",
                        placeholder: t("placeholder.pw1"),
                        name: "pw1",
                        id: "pw1",
                        onChange: onChangeValues
                    }}
                />
                {error.pw1 === "invalid" && <Error>{t("errors.pw.invalid")}</Error>}
                {error.pw1 === "valid" && <Correct>{t("errors.pw.valid")}</Correct>}
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.pw2 || "",
                        type: "password",
                        placeholder: t("placeholder.pw2"),
                        name: "pw2",
                        onChange: onChangeValues
                    }}
                />
                {error.pw2 == "notmatchs" && <Error>{t("errors.pw.notMatchs")}</Error>}
            </div>
                
            <div> 
                <label htmlFor="email">{t("email")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.email || "",
                        type: "email",
                        placeholder: t("placeholder.email"),
                        name: "email",
                        id: "email",
                        onChange: onChangeValues
                    }}
                />
                {error.email === "invalid" && <Error>{t("errors.email.invalid")}</Error>}
            </div>

            <Submit
                w={"25rem"}
                h={"2.5rem"}
                value={t("submit")}
            />
        </form>
    );
}


const formStyle = css`
    display: flex;
    flex-direction: column;

    & > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 3rem;
    }

    & > div > label {
        margin-bottom: 0.5em;
    }

    input {
        margin-bottom: 8px;
    }
`;

export default SignUpForm;