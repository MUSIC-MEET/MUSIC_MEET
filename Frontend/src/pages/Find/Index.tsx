import Content from "components/UI/Content";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Id from "./Id";
import Password from "./Password";
import { css } from "@emotion/react";

function Title(props: { children: string }) {
    return (<h1 css={[style]}> {props.children}</h1 >);
}
const Index = () => {
    const { type } = useParams<{ type: string }>();
    const { t } = useTranslation("findPage");
    const title: string = type === "id" ? t("id.title") : t("pw.title");
    const render = type === "id" ? <Id /> : <Password />;

    useEffect(() => {
        //
    }, [type]);

    if (type !== "id" && type !== "pw") {
        return (
            <div>{"error"}</div>
        );
    }
    if (type === "id" || type === "pw") {
        return (
            <Content>
                <Title>{title}</Title>
                {render}
            </Content >
        );
    }

};

const style = css`
    font-weight: 700;
    font-size: 2.6rem;
    margin-bottom: 50px;
`;

export default Index;