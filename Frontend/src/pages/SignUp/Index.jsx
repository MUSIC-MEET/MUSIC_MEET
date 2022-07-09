import React, { useCallback, useState, useLayoutEffect } from "react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import SignUpForm from "./SignUpForm";
import useHttp from "../../hooks/use-Http.tsx";
import useForm from "../../hooks/use-form";
import SignUpValidator from "./SignUpValidator";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { useRecoilValue, useSetRecoilState } from "recoil";
import  LoginState  from "store/LoginState";
import CurrentPage from "../../store/CurrentPage";

const initValues = {
    id: "",
    pw1: "",
    pw2: "",
    email: "",
    nickname: ""
};

const errorCode = ["server", "ID", "Password", "Email", "Nickname"];
const errorDetail = ["error", "duplicate", "invalid"];

function Index() {
    const { t } = useTranslation("registerPage");
    const { values, valuesChangeHandler, error } = useForm({ initValues, validator: SignUpValidator });
    const [ errorMsg, setErrorMsg ] = useState("");
    const { id , pw1, email, nickname } = values || "";
    const navigator = useNavigate();
    const { isLogIn } = useRecoilValue(LoginState);
    const setCurrentPage = useSetRecoilState(CurrentPage);
    const { status, fetchData } = useHttp({
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

    useLayoutEffect(() => {
        if(isLogIn)
            navigator("/");
        setCurrentPage(-1);
    },[isLogIn, navigator, setCurrentPage]);

    const requestHandler = useCallback(() => {
        fetchData().then(() => {
            navigator("/signup/success");
        }).catch((e)=>{
            const msg = e.msg ?? 0;
            const code = e.code  ?? 0;
            const newError = `${errorCode[parseInt(code)]} ${errorDetail[parseInt(msg)]}`;
            setErrorMsg(newError);
        });  
        
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

    if(status.isLoading) {
        return (
            <Content>
                <Title>{t("title")}</Title>
                <Loading />
            </Content>
        );
    }
    
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
            {status.isError && <h2>{errorMsg}</h2>}
        </Content>
    );
}

export default Index;