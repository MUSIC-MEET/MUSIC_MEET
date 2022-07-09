import Button from "components/common/Button";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EditBox, { EditBoxProps } from "./EditBox";
import { useNavigate } from "react-router-dom";
import useForm from "hooks/use-form";
import SignUpValidator from "pages/SignUp/SignUpValidator";
import useHttp from "hooks/use-Http";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";


interface ValuesProps {
    email: string;
    nickname: string;
}

const InitValues: ValuesProps = {
    email: "",
    nickname: ""
};

function ValuesEdit() {
    const { t } = useTranslation<"myPage">("myPage");
    const navigate = useNavigate();

    const { values, valuesChangeHandler, error } = useForm({
        initValues: InitValues,
        validate: SignUpValidator
    });

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        //
        e.preventDefault();
    };

    const changePasswordHandler = useCallback(() => {
        navigate("/user/resetpw");
    }, [navigate]);

    const editBox: EditBoxProps[] = [
        {
            label: t("edit.values.label.id"),
            input: {
                id: "id",
                name: "id",
                type: "text",
                placeholder: t("edit.values.placeholder.id"),
                disabled: "disabled"
            },
            submit: t("edit.values.submit"),
            onSubmit: onSubmit
        },
        {
            label: t("edit.values.label.nickname"),
            input: {
                id: "nickname",
                name: "nickname",
                type: "text",
                placeholder: t("edit.values.placeholder.nickname"),
                disabled: ""
            },
            submit: t("edit.values.submit"),
            onSubmit: onSubmit
        },
        {
            label: t("edit.values.label.email"),
            input: {
                id: "email",
                name: "email",
                type: "email",
                placeholder: t("edit.values.placeholder.email"),
                disabled: ""
            },
            submit: t("edit.values.submit"),
            onSubmit: onSubmit
        },
    ];
    return (
        <section>
            {editBox.map((box, index) => (
                <EditBox
                    key={index}
                    label={box.label}
                    input={box.input}
                    submit={box.submit}
                    onSubmit={box.onSubmit}
                />
            ))}
            <Button
                w={"28.5rem"}
                h={"3rem"}
                value={t("edit.values.changePasswordButton")}
                onClick={changePasswordHandler}
            />
        </section>
    );
}


export default ValuesEdit;