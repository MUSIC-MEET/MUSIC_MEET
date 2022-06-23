/** @jsxImportSource @emotion/react */
import useAxios from "hooks/use-Axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "components/UI/Content";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import LoginModalShownState from "store/LoginModalShown";

interface ResultProps {
    title: string;
    description: string;
}

interface SucessProp {
    go: string,
    onClickHandler: () => void;
}
function Suceess(props: ResultProps & SucessProp) {
    const { title, description, go, onClickHandler } = props;
    return (
        <Content>
            <Title>{title}</Title>
            <p>{description}</p>
            <p onClick={onClickHandler} css={css`margin-top: 0.5rem; cursor: pointer;`}>{go}</p>
        </Content>

    );
}

function Fail(props: ResultProps) {
    const { title, description } = props;
    return (
        <Content>
            <Title>{title}</Title>
            <p>{description}</p>
        </Content>
    );
}

function Index() {
    const { value } = useParams<{ value: string }>();
    const [result, setResult] = useState<boolean>(false);
    const { t } = useTranslation("registerPage");
    const navigate = useNavigate();
    const setLoginModal = useSetRecoilState(LoginModalShownState);
    const { fetchData } = useAxios({
        method: "GET",
        url: `/auth/${value}`
    });
    useEffect(() => {
        fetchData()
            .then(() => {
                setResult(true);
            })
            .catch(() => {
                setResult(false);
            });
    }, [fetchData]);

    const goLoginHandler = useCallback(() => {
        navigate("/");
        setLoginModal(true);
    }, [navigate, setLoginModal]);

    if (result) {
        return Suceess({
            title: t("emailauth.success.title"),
            description: t("emailauth.success.description"),
            go: t("emailauth.success.go"),
            onClickHandler: goLoginHandler
        });
    } else {
        return Fail({
            title: t("emailauth.fail.title"),
            description: t("emailauth.fail.description"),
        });
    }
}

export default Index;