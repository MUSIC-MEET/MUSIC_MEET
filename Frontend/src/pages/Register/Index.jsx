/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import Input from "../../components/common/Input";
import { css } from "@emotion/react";
const INITVALUES = {
    id: "",
    pw1: "",
    pw2: "",
    email: ""
};

function Index() {
    const { t } = useTranslation("registerPage");
    const [values, setValues] = useState(INITVALUES);

    const onChangeValues = useCallback((e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    },[values]);
    return (
        <Content>
            <Title>{t("title")}</Title>
            <form css={[formStyle]}>
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

                <input type="submit" value="dd"/>
            </form>
        </Content>
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
export default Index;