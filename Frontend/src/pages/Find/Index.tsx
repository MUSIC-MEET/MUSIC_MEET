import Content from "components/UI/Content";
import Title from "components/common/Title";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";



function IdPage() {
    return (
        <div>
            id
        </div>
    );
}

function PwPage() {
    return (
        <div>
            pw
        </div>
    );
}

function Index() {
    const { type } = useParams<{ type: string }>();
    const { t } = useTranslation("findPage");
    const render = type === "id" ? <IdPage /> : <PwPage />;
    const title = type === "id" ? t("id.title") : t("pw.title");
    useEffect(() => {
        //
    }, []);
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
            </Content>
        );
    }

}

export default Index;