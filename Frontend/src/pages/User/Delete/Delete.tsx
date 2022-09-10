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
import ConfirmModal from "../../../components/AlertModal/ConfirmModal";

/**
 * 계정 탈퇴 컴포넌트
 * @returns 
 */
function Delete() {
    const [isSuccess, setIsSuccess] = useState<boolean>(false); // 계정 탈퇴 성공 모달 띄우기 위한 state
    const [isFail, setIsFail] = useState<boolean>(false);
    const [check, setCheck] = useState<boolean>(false); // 마지막으로 탈퇴 여부 한번더 묻는 모달 띄우기 위한 state
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
        setCheck(true);
    }, []);

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
            {
                check &&
                <ConfirmModal
                    title={(t("checkModal.title"))}
                    content={t("checkModal.content")}
                    confirmButtonText={t("checkModal.confirm")}
                    cancelButtonText={t("checkModal.cancel")}
                    onConfirm={() => { mutate(password); setCheck(false); }}
                    onCancel={() => setCheck(false)}
                    onClose={() => setCheck(false)}
                />
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