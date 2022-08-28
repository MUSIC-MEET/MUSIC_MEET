import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReportIcon from "@mui/icons-material/Report";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import { useMutation } from "react-query";
import deleteBoard from "../../../utils/RequestApis/GenreBoard/deleteBoard";
import ConfirmModal from "../../../components/AlertModal/ConfirmModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

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
                    <button
                        onClick={deleteModalOpenHandler}
                        className="delete button"
                    >
                        <DeleteForeverIcon />
                    </button>
                    <button className="edit button">
                        <BuildIcon />
                    </button>
                </React.Fragment>
            }
            <button className="report button">
                <ReportIcon />
            </button>
        </section>
    );
}

const style = css`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    .button {
        all: unset;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        margin-left: 0.3rem;
        border-radius: 3px;
    }

    .delete {
        background-color: #b3301f;
    }
    .edit {
        background-color: #1fb61f;
    }

    .report {
        background-color: red;
    }
`;


export default React.memo(MoreActions);