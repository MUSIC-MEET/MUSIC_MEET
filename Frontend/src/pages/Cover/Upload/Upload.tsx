import Title from "components/common/Title";
import React, { useCallback } from "react";
import InputForm from "./InputForm";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import uploadCoverMusic from "utils/RequestApis/Cover/uploadCoverMusic";
import CoverType from "../CoverType";

/**
 * /cover/upload Route Component
 * @returns 
 */
function Upload() {
    const { t } = useTranslation<"coverUploadPage">("coverUploadPage");
    const { mutate } = useMutation(["uploadCover"], uploadCoverMusic, {
        useErrorBoundary: true
    });
    const onSubmitHandler = useCallback(({ title, description, mp3File }: CoverType) => {
        mutate({ title, description, mp3File });
    }, [mutate]);
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <InputForm
                onSubmit={onSubmitHandler}
            />
        </React.Fragment>
    );
}

export default React.memo(Upload);