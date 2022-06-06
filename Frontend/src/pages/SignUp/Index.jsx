/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import SignUpForm from "./SignUpForm";
import useAxios from "../../hooks/use-Axios";
import useForm from "../../hooks/use-form";
import SignUpValidator from "./SignUpValidator";


const initValues = {
    id: "",
    pw1: "",
    pw2: "",
    email: "",
    nickname: ""
};

function Index() {
    const { t } = useTranslation("registerPage");
    const { values, valuesChangeHandler, error } = useForm({ initValues, validator: SignUpValidator });
    const { id , pw1, email, nickname } = values || "";
    const { data, errors, isError, isLodding, fetchData } = useAxios({
        method: "POST",
        url: "/createuser",
        body: {
            id: id,
            pw: pw1,
            email: email,
            nickname: nickname
        },
        header: {
            "Content-Type": "application/json"
        }
    });

    const requestHandler = useCallback(() => {
        fetchData();
    },[fetchData]);
    
    const formSubmitHandler = useCallback(() => {
        if(error.clear) 
            requestHandler();
    },[error.clear, requestHandler]);

    if(error) {
        //
    }
    
    return (
        <Content>
            <Title>{t("title")}</Title>
            <SignUpForm 
                values={values}
                onChangeValues={valuesChangeHandler}
                onRequest={formSubmitHandler}
                error={error}
            />
            {isLodding && <h2>Loddding</h2>}
            {isError && <h2>Error</h2>}
        </Content>
    );
}

export default Index;