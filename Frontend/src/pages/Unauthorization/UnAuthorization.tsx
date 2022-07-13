import AlertModal from "components/AlertModal/AlertModal";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useResetRecoilState } from "recoil";
import LoginState from "store/LoginState";

function UnAuthorization() {
    const { t } = useTranslation<"unAuthorization">("unAuthorization");
    const [isOpen, setIsOpen] = useState(true);
    const resetLoginState = useResetRecoilState(LoginState);
    const ModalCloseHandler = useCallback(() => {
        setIsOpen(false);
    }, []);

    const ModalButtonClickHandler = useCallback(() => {
        resetLoginState();
        setIsOpen(false);
    }, [resetLoginState]);

    return (
        isOpen &&
        <AlertModal
            title={t("title")}
            content={t("content")}
            button={t("button")}
            onClose={ModalCloseHandler}
            buttonClick={ModalButtonClickHandler}
        />
    );
}

export default UnAuthorization;