import Title from "components/common/Title";
import Content from "components/UI/Content";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import DeleteInputForm from "./DeleteInputForm";
import deleteAccount from "utils/RequestApis/MyPage/DeleteAccount";
import { AxiosResponse } from "axios";
import AlertModal from "../../../components/AlertModal/AlertModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Delete() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const navigator = useNavigate();
    const { t } = useTranslation<"deleteAccountPage">("deleteAccountPage");
    const { mutate } = useMutation(deleteAccount, {
        onSuccess: (response: AxiosResponse) => {
            if (response.status === 204) {
                setIsSuccess(true);
            }
        },

        onError: ({ response }: { response: AxiosResponse }) => {
            if (response.status === 401) {
                setIsFail(true);
            }
        }

    });
    const [password, setPassword] = useState("");

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(password);
    }, [mutate, password]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, [setPassword]);
    return (
        <Content>
            {
                isSuccess &&
                <AlertModal
                    title={t("modal.title")}
                    content={t("modal.content")}
                    button={t("modal.button")}
                    buttonClick={() => navigator("/user/logout")}
                    onClose={() => navigator("/user/logout")} />
            }
            <Title>{t("title")}</Title>
            <DeleteInputForm
                onSubmit={onSubmit}
                onChange={onChange}
                value={password}
                isFail={isFail}
            />
        </Content>
    );
}

export default Delete;