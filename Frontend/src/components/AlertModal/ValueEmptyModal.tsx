import React, { useState } from "react";
import AlertModal from "components/AlertModal/AlertModal";
import { useTranslation } from "react-i18next";

interface ValueEmptyModalProps {
    callback: () => void;
}

/**
 * ValueEmptyModal Component
 * 값이 비었을떄 값을 채우라고 알려주는 모달
 * @param props.callback - 모달이 닫힐때 실행할 함수
 * @returns 
 */
function ValueEmptyModal(props: ValueEmptyModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const handleClose = () => {
        setIsOpen(false);
        props.callback();
    };
    const { t } = useTranslation<"valueEmptyModal">("valueEmptyModal");
    return (
        <React.Fragment>
            {isOpen &&
                <AlertModal
                    title={t("title")}
                    content={t("description")}
                    button={t("button")}
                    onClose={handleClose}
                    buttonClick={handleClose}
                />
            }
        </React.Fragment>
    );
}

export default ValueEmptyModal;