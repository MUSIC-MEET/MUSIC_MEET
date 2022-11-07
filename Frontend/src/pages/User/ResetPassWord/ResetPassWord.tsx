import Title from "components/common/Title";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignUpValidator from "pages/SignUp/SignUpValidator";
import { css } from "@emotion/react";
import useForm from "hooks/use-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginModalShown from "store/LoginModalShown";
import ResetPassWordForm from "./ResetPassWordForm";
import LoginState from "store/LoginState";
import CurrentPage from "store/CurrentPage";
import { useMutation, useQuery } from "react-query";
import authKeyCheck from "../../../utils/RequestApis/ResetPassword/AuthKeycheck";
import changePassword from "utils/RequestApis/ResetPassword/ChangePassword";
import Loading from "components/common/Loading";
import Success from "./Success";

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
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const setCurrentPage = useSetRecoilState(CurrentPage);

    const {
        mutate: requestChangePassword,
        isSuccess: changeRequestIsSuccess,
        isError: changeRequestIsError,
        isLoading: changeRquestIsLoading,
    } = useMutation(changePassword, {
        retry: 0,
        useErrorBoundary: false,
    });

    const {
        isSuccess: keyIsSuccess,
        isError: keyIsError,
        isLoading: keyIsLoading,
        refetch: keyCheck
    } =
        useQuery("keyCheck", () => authKeyCheck(key), {
            enabled: false,
            suspense: false,
            retry: 0,
            useErrorBoundary: false,
        });

    useEffect(() => {
        setCurrentPage(-1);
        if (!isLogIn)
            keyCheck();
    }, [isLogIn, setCurrentPage, keyCheck]);

    const goLoginHandler = useCallback(() => {
        setLoginModalShown(true);
        navigate("/");
    }, [navigate, setLoginModalShown]);

    const matchs = ((values.pw1 === values.pw2) && values.pw1.length > 0);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!matchs) return;
        if (isLogIn) requestChangePassword({ key: null, password: values.pw1 });
        else requestChangePassword({ key: key, password: values.pw1 });
    }, [isLogIn, key, matchs, requestChangePassword, values.pw1]);


    // 로딩
    if (keyIsLoading || changeRquestIsLoading) {
        return (
            <React.Fragment>
                <Title>{t("title")}</Title>
                <Loading />
            </React.Fragment >
        );
    }


    // 비밀번호 변경 리퀘스트 결과
    if (
        changeRequestIsSuccess ||
        changeRequestIsError
    ) {
        return (
            <React.Fragment>
                <Title>{t("title")}</Title>
                {changeRequestIsSuccess &&
                    <React.Fragment>
                        <Success
                            success={t("success")}
                            ment={t("go")}
                            callBack={goLoginHandler}
                        />
                    </React.Fragment>
                }
                {
                    changeRequestIsError &&
                    <React.Fragment>
                        <p>{t("error")}</p>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }

    // 비회원 인증키도 알맞지않고 회원이 아닐때 유효하지 않다는걸 알려주는 화면 렌더링
    if (keyIsError && !isLogIn) {
        return (
            <React.Fragment>
                <Title>{t("title")}</Title>
                <p>{t("keyError")}</p>
            </React.Fragment>
        );
    }

    // 비회원 인증키가 유효하거나 회원일때 새 비밀번호 입력하는 폼 렌더링
    if (keyIsSuccess || isLogIn) {
        return (
            <React.Fragment>
                <Title>{t("title")}</Title>
                <ResetPassWordForm
                    onSubmit={onSubmit}
                    values={values}
                    error={error}
                    valuesChangeHandler={valuesChangeHandler}
                    matchs={matchs}
                />
            </React.Fragment>
        );
    }

    return (
        <div></div>
    );
}

export default React.memo(ResetPassWord);
