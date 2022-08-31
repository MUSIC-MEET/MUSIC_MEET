import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import { useMutation } from "react-query";
import deleteBoard from "../../../utils/RequestApis/GenreBoard/deleteBoard";
import ConfirmModal from "../../../components/AlertModal/ConfirmModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import DeleteIconButton from "components/common/ActionButton/DeleteIconButton";
import EditIconButton from "components/common/ActionButton/EditIconButton";
import ReportIconButton from "components/common/ActionButton/ReportIconButton";

function MoreActions(
    { writer, num, genre }: { writer: string, num: string, genre: string }
) {
    const { nickname } = useRecoilValue<{ nickname: string }>(LoginState);
    const { t } = useTranslation<"genreBoardViewer">("genreBoardViewer");
    const [shownDeleteModal, setShownDeleteModal] = useState<boolean>(false);
    const navigator = useNavigate();
    const { mutate } = useMutation(deleteBoard, {
        useErrorBoundary: true,
        onSuccess: (response: AxiosResponse) => {
            if (response.status === 204) {
                navigator(`/board/${genre}`);
            }
        }
    });

    const deleteModalCloseHandler = useCallback(() => {
        setShownDeleteModal(false);
    }, []);

    const deleteModalOpenHandler = useCallback(() => {
        setShownDeleteModal(true);
    }, []);

    const deleteHandler = useCallback(() => {
        mutate({ genre, num });
    }, [genre, mutate, num]);
    return (
        <section css={style}>
            {
                shownDeleteModal &&
                <ConfirmModal
                    title={t("deleteModal.title")}
                    content={t("deleteModal.content")}
                    confirmButtonText={t("deleteModal.confirm")}
                    cancelButtonText={t("deleteModal.cancel")}
                    onConfirm={deleteHandler}
                    onCancel={deleteModalCloseHandler}
                    onClose={deleteModalCloseHandler}
                />
            }
            {nickname === writer &&
                <React.Fragment>
                    <DeleteIconButton
                        onClick={deleteModalOpenHandler}
                    />
                    <EditIconButton
                        onClick={() => {/* TODO */ }}
                    />
                </React.Fragment>
            }
            <ReportIconButton
                onClick={() => {/* TODO */ }}
            />
        </section >
    );
}

const style = css`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    & > .action-button {
        width: 2.5rem;
        height: 2.5rem;
        margin-left: 0.5rem;
    }
    
`;


export default React.memo(MoreActions);