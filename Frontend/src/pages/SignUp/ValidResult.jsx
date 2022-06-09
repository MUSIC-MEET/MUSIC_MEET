import React from "react";
import Correct from "../../components/common/Correct";
import Error from "../../components/common/Error";
import { useTranslation } from "react-i18next";

function ValidResult({ result, name }) { 
    const { t } = useTranslation("registerPage");
    
 
    if(result === "valid") {
        return (
            <Correct>{t(`errors.${name}.valid`)}</Correct>
        );
    }
    else if( result === "invalid") {
        return (
            <Error>{t(`errors.${name}.invalid`)}</Error>
        );
    }
    else if( result === "notmatchs") {
        return (
            <Error>{t(`errors.${name}.notMatchs`)}</Error>
        );
    } 
    else if ( result === "duplicate") {
        return (
            <Error>{t(`errors.${name}.duplicate`)}</Error>
        );
    }
}

export default React.memo(ValidResult);