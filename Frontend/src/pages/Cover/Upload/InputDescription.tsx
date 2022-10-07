import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "store/ThemeContext";

interface InputDescriptionProps {
    description: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * Cover Upload Description Component
 * @param props.description - description value
 * @param props.onChange - description input onChange event
 * @returns 
 */
function InputDescription(props: InputDescriptionProps) {
    const ctx = useContext(ThemeContext);
    const { t } = useTranslation<"coverUploadPage">("coverUploadPage");
    return (
        <React.Fragment>
            <label>
                <b>{t("form.description")}</b>
                <textarea
                    css={style}
                    style={{
                        "borderColor": ctx.themeStyle.input.borderColor,
                        "color": ctx.themeStyle.content.fontColor
                    }}
                    value={props.description}
                    placeholder={t("form.descriptionPlaceholder")}
                    onChange={props.onChange}
                />
            </label>

        </React.Fragment>
    );
}

const style = css`
    width: 100%;
    height: 15rem;
    &:focus {
        outline: none;
    }
    background: none;
    padding: 0.5rem;
    font-size: 1rem;
`;

export default InputDescription;