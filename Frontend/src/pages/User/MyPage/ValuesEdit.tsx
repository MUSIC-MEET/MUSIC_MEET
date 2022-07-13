import Button from "components/common/Button";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EditBox, { EditBoxProps } from "./EditBox";
import { useNavigate } from "react-router-dom";
import useForm from "hooks/use-form";
import SignUpValidator from "pages/SignUp/SignUpValidator";
import ChangeEmailRequest from "utils/RequestApis/MyPage/ChangeEmail";

interface Props {
    myInfo: {
        id: string;
        nickname: string;
        email: string;
    }
}
function ValuesEdit(props: Props) {
    const { myInfo } = props;
    const { t } = useTranslation<"myPage">("myPage");
    const navigate = useNavigate();

    const { values, valuesChangeHandler, error } = useForm({
        initValues: myInfo,
        validator: SignUpValidator
    });

    const { email, nickname } = values;

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        //
        e.preventDefault();
    };

    const emailChangeButtonClickHandler = useCallback(async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        await ChangeEmailRequest(email)
            .then((res: any) => {
                console.log(res.response.status);
            })
            .catch((err: any) => {
                console.log(err.response.status);
            });
    }, [email]);

    const changePasswordHandler = useCallback(() => {
        navigate("/user/resetpw");
    }, [navigate]);

    const editBox: EditBoxProps[] = [
        {
            label: t("edit.values.label.id"),
            input: {
                id: "id",
                name: "id",
                value: myInfo.id,
                type: "text",
                placeholder: t("edit.values.placeholder.id"),
                disabled: "disabled",
                onChange: valuesChangeHandler,
            },
            error: error.id,
            submit: t("edit.values.submit"),
            onSubmit: onSubmit
        },
        {
            label: t("edit.values.label.nickname"),
            input: {
                id: "nickname",
                name: "nickname",
                value: nickname,
                type: "text",
                placeholder: t("edit.values.placeholder.nickname"),
                disabled: "",
                onChange: valuesChangeHandler,

            },
            error: error.nickname,
            submit: t("edit.values.submit"),
            onSubmit: onSubmit
        },
        {
            label: t("edit.values.label.email"),
            input: {
                id: "email",
                name: "email",
                value: email,
                type: "email",
                placeholder: t("edit.values.placeholder.email"),
                disabled: "",
                onChange: valuesChangeHandler,
            },
            error: error.email,
            submit: t("edit.values.submit"),
            onSubmit: emailChangeButtonClickHandler
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
                    error={box.error}
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