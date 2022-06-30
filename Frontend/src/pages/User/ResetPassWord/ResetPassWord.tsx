import Title from "components/common/Title";
import Content from "components/UI/Content";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxios from "hooks/use-Axios";
import { CircularProgress } from "@mui/material";
import SignUpValidator from "pages/SignUp/SignUpValidator";
import { css } from "@emotion/react";
import useForm from "hooks/use-form";
import { useSetRecoilState } from "recoil";
import LoginModalShown from "store/LoginModalShown";
import ResetPassWordForm from "./ResetPassWordForm";



interface ResetPasswordValuesType {
    pw1: string;
    pw2: string;
}
const initValues: ResetPasswordValuesType = {
    pw1: "",
    pw2: ""
};
function ResetPassWord() {
    const params = useParams<{ key: string }>();
    const key: string = params.key ?? "0";
    const { t } = useTranslation<"resetPasswordPage">("resetPasswordPage");
    const setLoginModalShown = useSetRecoilState(LoginModalShown);
    const navigate = useNavigate();
    const { values, valuesChangeHandler, error } =
        useForm({ initValues, validator: SignUpValidator });
    const { status, fetchData } = useAxios({
        url: `/resetpw`,
        method: "POST",
        body: {
            newPw: values.pw1,
            encoding_value: key
        },
    });

    const { status: keyCheckStatus, fetchData: keyCheck } = useAxios({
        method: "GET",
        url: `/auth/pw/${key}`
    });

    useEffect(() => {
        //
        keyCheck();
    }, [key]);

    const goLoginHandler = useCallback(() => {
        setLoginModalShown(true);
        navigate("/");
    }, [navigate, setLoginModalShown]);

    const matchs = ((values.pw1 === values.pw2) && values.pw1.length > 0);

    const onSubmit = useCallback(() => {
        if (!matchs) return;
        fetchData()
            .then(() => {
                // then
            })
            .catch((e) => {
                // catch
            });
    }, [fetchData, matchs]);

    if (keyCheckStatus.isError) {
        return (
            <Content>
                <Title>{t("title")}</Title>
                <p>{t("keyError")}</p>
            </Content>
        );
    }

    if (status.isLoading) {
        return (
            <Content>
                <Title>{t("title")}</Title>
                <CircularProgress />
            </Content>
        );
    }

    if (status.isSucess || status.isError) {
        return (
            <Content>
                <Title>{t("title")}</Title>
                {status.isSucess &&
                    <React.Fragment>
                        <p>{t("sucess")}</p>
                        <a onClick={goLoginHandler} css={css`margin-top: 1rem; cursor: pointer;`}>{t("go")}</a>
                    </React.Fragment>
                }
                {
                    status.isError &&
                    <React.Fragment>
                        <p>{t("error")}</p>
                    </React.Fragment>
                }
            </Content>
        );
    }

    return (
        <Content>
            <Title>{t("title")}</Title>
            <ResetPassWordForm
                onSubmit={onSubmit}
                values={values}
                error={error}
                valuesChangeHandler={valuesChangeHandler}
                matchs={matchs}
            />
        </Content >
    );
}

export default React.memo(ResetPassWord);