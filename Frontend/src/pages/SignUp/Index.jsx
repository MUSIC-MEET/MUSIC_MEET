/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import SignUpForm from "./SignUpForm";
import useAxios from "../../hooks/use-Axios";
import useForm from "../../hooks/use-form";
import SignUpValidator from "./SignUpValidator";
import { useNavigate } from "react-router-dom";

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
    const navigator = useNavigate();
    
    const {  errors, isError, isLodding, fetchData } = useAxios({
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
        try {
            fetchData();
            navigator("/");
        } catch(e) {
            console.log(e);
        }
        
    },[fetchData, navigator]);
    
    const clear = error.id === "valid" 
    && error.nickname === "valid" 
    && error.pw1 === "valid" 
    && error.pw2 === "valid" 
    && error.email === "valid";

    const formSubmitHandler = useCallback(() => {
        if(clear) 
        {
            requestHandler();
        }
    },[clear, requestHandler]);

    
    
    return (
        <Content>
            <Title>{t("title")}</Title>
            <SignUpForm 
                values={values}
                onChangeValues={valuesChangeHandler}
                onRequest={formSubmitHandler}
                error={error}
                disabled={!clear}
            />
            {isLodding && <h2>Loddding</h2>}
            {isError && <h2>{errors}</h2>}
        </Content>
    );
}

export default Index;