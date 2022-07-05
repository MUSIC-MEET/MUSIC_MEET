import useAxios from "hooks/use-Axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import LoginModalShownState from "store/LoginModalShown";

import Content from "components/UI/Content";
import Title from "components/common/Title";
import { css } from "@emotion/react";
import CurrentPage from "store/CurrentPage";


function Index() {
    const { type, value } = useParams<{ value: string; type: string; }>();
    const [result, setResult] = useState<boolean>(false);
    const { t } = useTranslation("registerPage");
    const navigate = useNavigate();
    const setLoginModal = useSetRecoilState(LoginModalShownState);
    const setCurrentPage = useSetRecoilState(CurrentPage);
    const { fetchData } = useAxios({
        method: "GET",
        url: `/auth/${type}/${value}`
    });

    useEffect(() => {
        setCurrentPage(-1);
        fetchData()
            .then(() => {
                setResult(true);
            })
            .catch(() => {
                setResult(false);
            });
    }, [type, value, setCurrentPage]);

    const goLoginHandler = useCallback(() => {
        navigate("/");
        setLoginModal(true);
    }, [navigate, setLoginModal]);


    const title = result ? t("emailauth.success.title") : t("emailauth.fail.title");
    const description = result ? t("emailauth.success.description") : t("emailauth.fail.description");

    return (
        <Content>
            <Title>{title}</Title>
            <p>{description}</p>
            {result && <p css={css`margin-top: 1rem;`} onClick={goLoginHandler}>{t("emailauth.success.go")}</p>}
        </Content>
    );
}

export default Index;