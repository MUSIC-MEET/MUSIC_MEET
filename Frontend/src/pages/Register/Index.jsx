/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import Input from "../../components/common/Input";
import { css } from "@emotion/react";
import Submit from "components/common/Submit";
import RegisterForm from "./RegisterForm";
const INITVALUES = {
    id: "",
    pw1: "",
    pw2: "",
    email: ""
};

function Index() {
    const { t } = useTranslation("registerPage");
    const [values, setValues] = useState(INITVALUES);

    const changeValuesHandler = useCallback((e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    },[values]);
    return (
        <Content>
            <Title>{t("title")}</Title>
            <RegisterForm 
                values={values}
                onChangeValues={changeValuesHandler}
            />
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