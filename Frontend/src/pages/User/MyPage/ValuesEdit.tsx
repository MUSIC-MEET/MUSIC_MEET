import Button from "components/common/Button";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import EditBox, { EditBoxProps } from "./EditBox";
import { useNavigate } from "react-router-dom";
import useForm from "hooks/use-form";
import SignUpValidator from "pages/SignUp/SignUpValidator";
import changeMail from "utils/RequestApis/MyPage/ChangeEmail";
import changeNickname from "utils/RequestApis/MyPage/ChangeNickname";
import AlertModal from "components/AlertModal/AlertModal";
import { useResetRecoilState } from "recoil";
import LoginState from "store/LoginState";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

interface Props {
    myInfo: {
        id: string;
        nickname: string;
        email: string;
    }
}

interface AlertModal {
    isOpen: boolean;
    title: string;
    content: string;
    button: string;
    after: () => void;
}

function ValuesEdit(props: Props) {
    const { myInfo } = props;
    const { t } = useTranslation<"myPage">("myPage");
    const navigate = useNavigate();
    const [isOpenNicknameModal, setIsOpenNicknameModal] = useState<boolean>(false);
    const [isOpenEmailModal, setIsOpenEmailModal] = useState<boolean>(false);
    const resetLoginState = useResetRecoilState(LoginState);
    const { refetch: requestMailChange } = useQuery("/user/email", () => changeMail(email), {
        enabled: false,
        suspense: true
    });
    const { refetch: requestNicknameChange } = useQuery("/user/nickname", () => changeNickname(nickname), {
        enabled: false,
        suspense: true
    });
    const { values, valuesChangeHandler, error } = useForm({
        initValues: myInfo,
        validator: SignUpValidator
    });
    const { email, nickname } = values;

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        //
        e.preventDefault();
    };

    const changeSuccess = useCallback(() => {
        setIsOpenNicknameModal(false);
        setIsOpenEmailModal(false);
        resetLoginState(); // 모달을 닫고 재로그인 안할수도 있기때문에 해줘야함
    }, [resetLoginState]);

    const nicknameChangeButtonClickHandler = useCallback((e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        requestNicknameChange<AxiosResponse>().then((res) => {
            if (res?.data?.status === 204) {
                setIsOpenNicknameModal(true);
            }
        }).catch((err: AxiosResponse) => {
            if (err.data.status === 401) {
                throw "401";
            }
        });
    }, [requestNicknameChange]);

    const emailChangeButtonClickHandler = useCallback((e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        requestMailChange<AxiosResponse>().then((res) => {
            if (res?.data?.status === 204) {
                setIsOpenEmailModal(true);
            }
        }).catch((err: AxiosResponse) => {
            if (err.data.status === 401) {
                throw "401";
            }
        });
    }, [requestMailChange]);

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
            onSubmit: nicknameChangeButtonClickHandler
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

    const AlertModals: AlertModal[] = [
        {
            isOpen: isOpenNicknameModal,
            title: t("edit.values.NicknameAlertModal.title"),
            content: t("edit.values.NicknameAlertModal.content"),
            button: t("edit.values.NicknameAlertModal.button"),
            after: changeSuccess
        },
        {
            isOpen: isOpenEmailModal,
            title: t("edit.values.EmailAlertModal.title"),
            content: t("edit.values.EmailAlertModal.content"),
            button: t("edit.values.EmailAlertModal.button"),
            after: changeSuccess
        }
    ];

    return (
        <section>
            {AlertModals.map((modal, index) => (
                (
                    modal.isOpen &&
                    <AlertModal
                        title={modal.title}
                        content={modal.content}
                        button={modal.button}
                        onClose={modal.after}
                        buttonClick={modal.after}
                        key={index}
                    />
                )
            ))}
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