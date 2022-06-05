/** @jsxImportSource @emotion/react */
import React from "react";
import Input from "../../components/common/Input";
import { css } from "@emotion/react";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
function RegisterForm({ values, onChangeValues }) {
    const { t } = useTranslation("registerPage");
    return (
        <form css={[formStyle]} >
            <div>
                <label htmlFor="id">{t("id")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.id,
                        type: "text",
                        placeholder: t("placeholder.id"),
                        name: "id",
                        id: "id",
                        onChange: onChangeValues
                    }}
                />
            </div>
                
            <div>
                <label htmlFor="nickname">{t("nickname")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.nickname,
                        type: "text",
                        placeholder: t("placeholder.nickname"),
                        name: "nickname",
                        id: "nickname",
                        onChange: onChangeValues
                    }}
                />
            </div>        


            <div>
                <label htmlFor="pw1">{t("password")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.pw1,
                        type: "password",
                        placeholder: t("placeholder.pw1"),
                        name: "pw1",
                        id: "pw1",
                        onChange: onChangeValues
                    }}
                />
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.pw2,
                        type: "password",
                        placeholder: t("placeholder.pw2"),
                        name: "pw2",
                        onChange: onChangeValues
                    }}
                />

            </div>
                
            <div> 
                <label htmlFor="email">{t("email")}</label>
                <Input 
                    w={"25rem"}
                    h={"2.5rem"}
                    input = {{
                        value: values.email,
                        type: "email",
                        placeholder: t("placeholder.email"),
                        name: "email",
                        id: "email",
                        onChange: onChangeValues
                    }}
                />
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

export default RegisterForm;