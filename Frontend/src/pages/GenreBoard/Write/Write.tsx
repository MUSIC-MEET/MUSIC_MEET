import Title from "components/common/Title";
import React, { useContext } from "react";
import GenreSelector from "../GenreSelector";
import { useParams } from "react-router-dom";
import style from "../SectionStyle";
import InputForm from "./InputForm";
import { useTranslation } from "react-i18next";
import GenreBoardContext from "store/GenreBoardContext";
import ErrorBoundary from "../ErrorBoundary";
function Write() {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const { setGenre } = useContext(GenreBoardContext);
    setGenre(genre);
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    return (
        <section css={style}>
            <Title>{t("title")}</Title>
            <GenreSelector
                write={true}
            />
            <ErrorBoundary>
                <InputForm
                />
            </ErrorBoundary>
        </section>
    );
}



export default React.memo(Write);