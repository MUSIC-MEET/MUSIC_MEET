import React from "react";
import Form from "../../../components/common/Form";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Error from "components/common/Error";
interface DeleteInputFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    isFail: boolean;
}

function DeleteInputForm({ onSubmit, onChange, value, isFail }: DeleteInputFormProps) {
    const { t } = useTranslation<"deleteAccountPage">("deleteAccountPage");
    return (
        <Form
            onSubmit={onSubmit}
            direction="column"
            addCss={[formStyle]}
        >
            <label>{t("label")}</label>
            <Input
                w={"25rem"}
                h={"2.5rem"}
                input={{
                    type: "password",
                    name: "password",
                    id: "password",
                    onChange: onChange,
                    value: value,
                    placeholder: t("placeholder")
                }}
            />
            {
                isFail &&
                <Error>{t("error")}</Error>
            }
            <Submit
                w={"25rem"}
                h={"2.5rem"}
                value={t("submit")}
            />
        </Form>
    );
}

const formStyle = css`

    & > label {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
    & > input[type="submit"] {
        margin-top: 0.4rem;
    }

    & > b {
        margin-top: 0.7rem;
    }
`;





export default DeleteInputForm;