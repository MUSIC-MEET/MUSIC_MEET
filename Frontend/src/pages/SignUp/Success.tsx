/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";


function Success() {
    const { t } = useTranslation("registerPage");
    const navigate = useNavigate();
    const onClickHandler = useCallback(() => {
        navigate("/");
    }, [navigate]);
    return (
        <Content>
            <p css={css`font-size: 2.5rem; font-weight: bold`}>{t("success.ment")}</p>
            <a onClick={onClickHandler} css={css`margin-top: 1rem; cursor: pointer;`}> {t("success.go")}</a>
        </Content>
    );
}

export default React.memo(Success);