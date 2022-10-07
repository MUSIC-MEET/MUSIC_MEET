import Title from "components/common/Title";
import React, { useCallback } from "react";
import InputForm from "./InputForm";
import { useTranslation } from "react-i18next";

/**
 * /cover/upload Route Component
 * @returns 
 */
function Upload() {
    const { t } = useTranslation<"coverUploadPage">("coverUploadPage");
    const onSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, []);
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <InputForm
                onSubmit={() => { /* TODO */ }}
            />
        </React.Fragment>
    );
}

export default React.memo(Upload);