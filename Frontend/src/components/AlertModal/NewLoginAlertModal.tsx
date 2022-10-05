import React, { useState } from "react";
import AlertModal from "components/AlertModal/AlertModal";
import { useSetRecoilState } from "recoil";
import LoginModalShownState from "store/LoginModalShown";
import { useTranslation } from "react-i18next";

function NewLoginAlertModal() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const setLoginFormShown = useSetRecoilState(LoginModalShownState);
    const handleClose = () => {
        setIsOpen(false);
        setLoginFormShown(true);
    };
    const { t } = useTranslation<"newLoginAlertModal">("newLoginAlertModal");
    return (
        <React.Fragment>
            {isOpen &&
                <AlertModal
                    title={t("title")}
                    content={t("content")}
                    button={t("button")}
                    onClose={handleClose}
                    buttonClick={handleClose}
                />
            }
        </React.Fragment>
    );
}

export default NewLoginAlertModal;