import AlertModal from "components/AlertModal/AlertModal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function DeletePostAlert() {
    const { t } = useTranslation<"genreBoardViewer">("genreBoardViewer");
    const navigator = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const onCloseHandler = () => {
        setIsOpen(false);
        navigator(`/board`);
    };
    return (
        <React.Fragment>
            {isOpen &&
                <AlertModal
                    title={t("deleteAlertModal.title")}
                    content={t("deleteAlertModal.content")}
                    button={t("deleteAlertModal.confirm")}
                    onClose={onCloseHandler}
                    buttonClick={onCloseHandler}
                />
            }
        </React.Fragment>

    );
}

export default DeletePostAlert;