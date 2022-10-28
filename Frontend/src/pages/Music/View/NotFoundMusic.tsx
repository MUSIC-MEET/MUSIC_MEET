import styled from "@emotion/styled";
import React from "react";
import Text from "components/common/Text";
import { useTranslation } from "react-i18next";


function NotFoundMusic() {
    const { t } = useTranslation<"musicPage">("musicPage");
    return (
        <Div>
            <Text>{t("error.notFound")}</Text>
        </Div>
    );
}

const Div = React.memo(styled.div`
    width: 80vw;
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 3rem;
`);

export default React.memo(NotFoundMusic);