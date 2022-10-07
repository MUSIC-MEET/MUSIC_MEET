import React from "react";
import SectionWrapper from "components/common/SectionWrapper";
import Input from "components/common/Input";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

interface InputTitleProps {
    className?: string;
    title: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Cover Upload InputTitle Component
 * @param props.className - css class
 * @param props.title - title value
 * @param props.onChange - title input onChange event
 * @returns 
 */
function InputTitle(props: InputTitleProps) {
    const { t } = useTranslation<"coverUploadPage">("coverUploadPage");
    return (
        <React.Fragment>
            <label css={style}>
                <b>{t("form.title")}</b>
                <Input
                    input={{
                        type: "text",
                        placeholder: t("form.titlePlaceholder"),
                        value: props.title,
                        onChange: props.onChange,
                    }}
                />

            </label>
        </React.Fragment>
    );
}

const style = css`
    input {
        width: 100%;
        padding: 0.5rem;
    }
`;

export default React.memo(InputTitle);