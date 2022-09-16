import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AlertModal from "./AlertModal";

function DuplicateVoteModal() {
    const { t } = useTranslation<"duplicateVoteModal">("duplicateVoteModal");
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <React.Fragment>
            {isOpen &&
                <AlertModal
                    title={t("title")}
                    content={t("content")}
                    button={t("confirm")}
                    onClose={() => setIsOpen(() => false)}
                />
            }

        </React.Fragment>
    );
}

export default React.memo(DuplicateVoteModal);