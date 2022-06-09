/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import Input from "../../components/common/Input";
import { css } from "@emotion/react";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
import Error from "components/common/Error";
import Correct from "components/common/Correct";
import ValidResult from "pages/SignUp/ValidResult";

function SignUpForm({ values, onChangeValues, onRequest, error }) {
    const { t } = useTranslation("registerPage");
    
    const onSubmit = useCallback((event) => {
        event.preventDefault();
        onRequest();
    },[onRequest]);
    const a = "errors";
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
                <ValidResult
                    result={error.id}
                    name={"id"}
                />
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
                <ValidResult
                    result={error.nickname}
                    name={"nickname"}
                />
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
                <ValidResult
                    result={error.pw1}
                    name={"pw"}
                />
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
                <ValidResult
                    result={error.pw2}
                    name={"pw"}
                />
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
                <ValidResult
                    result={error.email}
                    name={"email"}
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

export default SignUpForm;