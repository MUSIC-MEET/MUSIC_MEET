import styled from "@emotion/styled";
import React from "react";
import { useTranslation } from "react-i18next";

function NotFoundCover() {
    const { t } = useTranslation<"coverViewPage">("coverViewPage");
    return (
        <Div>
            {t("notFound")}
        </Div>
    );
}
const Div = React.memo(styled.div`
    width: 80vw;
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 3rem;
`);

export default NotFoundCover;