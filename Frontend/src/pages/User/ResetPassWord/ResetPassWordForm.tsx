import { css } from "@emotion/react";
import Form from "components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import ValidResult from "pages/SignUp/ValidResult";
import React from "react";
import { useTranslation } from "react-i18next";

const WIDTH = "25rem";
const HEIGHT = "2.5rem";

interface ResetPasswordFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    values: {
        pw1: string;
        pw2: string;
    };
    error: {
        pw1: "invalid" | "valid" | "";
        pw2: "invalid" | "matchs" | "";
    };
    valuesChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    matchs: boolean;
}

function ResetPassWordForm(props: ResetPasswordFormProps) {
    const { onSubmit, values, error, valuesChangeHandler, matchs } = props;
    const { t } = useTranslation<"resetPasswordPage">("resetPasswordPage");
    return (
        <Form
            addCss={[formStyle]}
            direction="column"
            onSubmit={onSubmit}
        >
            <label htmlFor="password">{t("form.password.label")}</label>
            <Input
                w={WIDTH}
                h={HEIGHT}
                input={{
                    id: "password",
                    name: "pw1",
                    type: "password",
                    placeholder: t("form.password.placeholder"),
                    value: values.pw1,
                    onChange: valuesChangeHandler
                }}
            />
            <ValidResult
                result={error.pw1}
                name={"pw"}
            />

            <label htmlFor="rePassword">{t("form.rePassword.label")}</label>
            <Input
                w={WIDTH}
                h={HEIGHT}
                input={{
                    id: "rePassword",
                    name: "pw2",
                    type: "password",
                    placeholder: t("form.rePassword.placeholder"),
                    value: values.pw2,
                    onChange: valuesChangeHandler
                }}
            />
            <ValidResult
                result={error.pw2}
                name={"pw"}
            />

            <Submit
                w={WIDTH}
                h={HEIGHT}
                value={t("form.submit")}
                disabled={!matchs}
            />
        </Form>
    );
}


const formStyle = css`
    label {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    input[type="submit"] {
        margin-top: 2rem;
    }
`;

export default ResetPassWordForm;