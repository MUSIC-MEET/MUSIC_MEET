import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Title from "components/common/Title";

function Success() {
    const { t } = useTranslation("registerPage");
    const navigate = useNavigate();
    const onClickHandler = useCallback(() => {
        navigate("/");
    }, [navigate]);
    return (
        <React.Fragment>
            <Title>{t("success.title")}</Title>
            <p>{t("success.ment")}</p>
            <a onClick={onClickHandler} css={css`margin-top: 1rem; cursor: pointer;`}> {t("success.go")}</a>
        </React.Fragment>
    );
}

export default React.memo(Success);