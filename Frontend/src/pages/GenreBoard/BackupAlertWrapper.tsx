import { css } from "@emotion/react";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import Title from "components/common/Title";
import GreenButton from "components/common/GreenButton";
import RedButton from "components/common/RedButton";

interface BackupWrapperProps {
    setTitle: (title: string) => void;
    setContent: (cotent: string) => void;
    close: () => void;
}

interface BackupJosnType {
    title: string;
    content: string;
}

/**
 * 작성했던글이 남아있을경우 알려주는 Wrapper 
 * @param setTitle 제목을 설정하는 함수
 * @param setContent 내용을 설정하는 함수
 * @returns {React.FC}
 */

// eslint-disable-next-line react/display-name
const BackupAlertWrapper = forwardRef((props: BackupWrapperProps, ref: any) => {
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    const { setTitle, setContent, close } = props;
    /**
     * 백업 적용
     */
    const applyBackupHandler = () => {
        const backup: BackupJosnType = JSON.parse(localStorage.getItem("backup_board") || "{}");
        setTitle(backup.title);
        setContent(backup.content);
        ref?.current?.getInstance().setMarkdown(backup.content);
        close();
    };

    /**
     * 백업 삭제
     */
    const dropBackupHandler = () => {
        localStorage.removeItem("backup_board");
        close();
    };

    return (
        <section css={style}>
            <div className="backup-alert">
                <Title>{t("backup.title")}</Title>
                <p>{t("backup.content")}</p>
                <div className="actions">
                    <RedButton
                        type="button"
                        value={t("backup.confirm")}
                        onClick={applyBackupHandler}
                    />
                    <GreenButton
                        type="button"
                        value={t("backup.cancel")}
                        onClick={dropBackupHandler}
                    />
                </div>
            </div>
            <div className="alert-overlay">
            </div>
        </section >
    );
});

const style = css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 9997;
    & > .alert-overlay {
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9998;
    }

    & > .backup-alert {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 5rem;
        z-index: 9999;

        .actions {
            margin-top: 3rem;
            & > input {
            font-size: 1.3rem;
            width:  8rem;
            height: 3rem;
            text-align: center;
            margin-right: 0.5rem;
            }
        }
    }
`;

export default BackupAlertWrapper;