import Title from "components/common/Title";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputForm from "../InputForm";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import fetchEditCover from "utils/RequestApis/Cover/fetchEditCover";
import editCoverMusic from "utils/RequestApis/Cover/editCover";
import CoverType from "pages/Cover/CoverType";


/**
 * 커버 음악 수정 페이지
 * @returns 
 */
function Edit() {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation<"coverEditPage">("coverEditPage");
    const navigator = useNavigate();
    const { data } = useQuery(["fetchEditCover", id], () => fetchEditCover(id ?? "-1"), {

    });
    const { mutate } = useMutation(["editCover", id], editCoverMusic, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 204) {
                navigator("/cover/list");
            }
        }
    });
    const onSubmitHandler = useCallback(({ fileName, title, mp3File, description }: CoverType) => {
        mutate({ fileName, title, mp3File, description, id });
    }, [id, mutate]);

    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <InputForm
                title={data?.title}
                description={data?.description}
                fileName={data?.fileName}
                onSubmit={onSubmitHandler}
                navigator={navigator}
            />
        </React.Fragment>
    );

}

export default Edit;