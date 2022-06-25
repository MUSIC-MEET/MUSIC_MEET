import React, { useCallback, useState } from "react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import SignUpForm from "./SignUpForm";
import useAxios from "../../hooks/use-Axios.tsx";
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

const errorCode = ["server", "ID", "Password", "Email", "Nickname"];
const errorDetail = ["error", "duplicate", "invalid"];

function Index() {
    const { t } = useTranslation("registerPage");
    const { values, valuesChangeHandler, error } = useForm({ initValues, validator: SignUpValidator });
    const [ errorMsg, setErrorMsg ] = useState("");
    const { id , pw1, email, nickname } = values || "";
    const navigator = useNavigate();
    
    const { status, fetchData } = useAxios({
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
            {status.isLodding && <h2>Loddding</h2>}
            {status.isError && <h2>{errorMsg}</h2>}
        </Content>
    );
}

export default Index;