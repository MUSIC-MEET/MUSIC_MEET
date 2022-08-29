import Title from "components/common/Title";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import GenreBoardContext from "store/GenreBoardContext";
import ErrorBoundary from "../ErrorBoundary";
import GenreSelector from "../GenreSelector";
import InputForm from "../InputForm";
import style from "../SectionStyle";
import { useQuery } from "react-query";

function Update() {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const { setGenre } = useContext(GenreBoardContext);
    setGenre(genre);
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    const { data } = useQuery(["editboard"], () => { /**  */ },

    );

    return (
        <section css={style}>
            <Title>{t("update")}</Title>
            <GenreSelector
                write={true}
            />
            {/* <ErrorBoundary>
                <InputForm
                />
            </ErrorBoundary> */}
        </section>
    );
}

export default Update;