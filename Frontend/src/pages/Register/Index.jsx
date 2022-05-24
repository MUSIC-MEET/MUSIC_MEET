import React, { useCallback, useState } from "react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import { useTranslation } from "react-i18next";
import Input from "../../components/common/Input";

const INITVALUES = {
    id: "",
    password: ""
};

function Index() {
    const { t } = useTranslation("registerPage");
    const [values, setValues] = useState(INITVALUES);

    const onChangeValues = useCallback((e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    },[]);
    return (
        <Content>
            <Title>{t("title")}</Title>
            <Input 
                value="dd"
                w={"25rem"}
                h={"2.5rem"}
                input = {{
                    value: values.id,
                    type: "text",
                    placeholder: t("placeholder.id"),
                    name: "id",
                    onChange: onChangeValues
                }}
            />
        </Content>
    );
}

export default Index;