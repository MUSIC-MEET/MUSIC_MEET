import Title from "components/common/Title";
import React from "react";
import GenreSelector from "../GenreSelector";
import { useParams } from "react-router-dom";
import style from "../SectionStyle";
import InputForm from "./InputForm";
import { useTranslation } from "react-i18next";
function Write() {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    return (
        <section css={style}>
            <Title>{t("title")}</Title>
            <GenreSelector
                genre={genre}
                write={true}
            />
            <InputForm
                genre={genre}
            />
        </section>
    );
}



export default React.memo(Write);