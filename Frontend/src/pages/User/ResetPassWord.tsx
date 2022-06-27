import Title from "components/common/Title";
import Content from "components/UI/Content";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import useAxios from "hooks/use-Axios";
import { CircularProgress } from "@mui/material";
import SignUpValidator from "pages/SignUp/SignUpValidator";
import { css } from "@emotion/react";
import ValidResult from "pages/SignUp/ValidResult";
import useForm from "hooks/use-form";
import { useSetRecoilState } from "recoil";
import LoginModalShown from "store/LoginModalShown";

const WIDTH = "25rem";
const HEIGHT = "2.5rem";

interface ResetPasswordValuesType {
    pw1: string;
    pw2: string;
}
const initValues: ResetPasswordValuesType = {
    pw1: "",
    pw2: "'"
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
            password: values.ppw,
            key
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

    const matchs = (values.password === values.rePassword);

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

    // if (keyCheckStatus.isError) {
    //     return (
    //         <Content>
    //             <Title>{t("title")}</Title>
    //             <p>{t("keyError")}</p>
    //         </Content>
    //     );
    // }

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
            <Form
                addCss={[formStyle]}
                direction="column"
                onSubmit={onSubmit}
            >
                <label htmlFor="password">{t("form.password.label")}</label>
                <Input
                    w={WIDTH}
                    h={HEIGHT}
                    input={{
                        id: "password",
                        name: "pw1",
                        type: "password",
                        placeholder: t("form.password.placeholder"),
                        onChange: valuesChangeHandler
                    }}
                />
                <ValidResult
                    result={error.pw1}
                    name={"pw"}
                />

                <label htmlFor="rePassword">{t("form.rePassword.label")}</label>
                <Input
                    w={WIDTH}
                    h={HEIGHT}
                    input={{
                        id: "rePassword",
                        name: "pw2",
                        type: "password",
                        placeholder: t("form.rePassword.placeholder"),
                        onChange: valuesChangeHandler
                    }}
                />
                <ValidResult
                    result={error.pw2}
                    name={"pw"}
                />

                <Submit
                    w={WIDTH}
                    h={HEIGHT}
                    value={t("form.submit")}
                    disabled={!matchs}
                />
            </Form>
        </Content >
    );
}

const formStyle = css`
    label {
        margin-top: 1rem;
    }

    input[type="submit"] {
        margin-top: 2rem;
    }
`;
export default React.memo(ResetPassWord);
