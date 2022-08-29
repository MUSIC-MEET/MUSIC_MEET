import Title from "components/common/Title";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import GenreBoardContext from "store/GenreBoardContext";
import ErrorBoundary from "../ErrorBoundary";
import GenreSelector from "../GenreSelector";
import InputForm from "../InputForm";
import style from "../SectionStyle";
import { useQuery } from "react-query";

function Edit() {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const { setGenre } = useContext(GenreBoardContext);
    setGenre(genre);
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    const { data } = useQuery(["editboard"], () => { /**  */ },
        {

        }
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

export default Edit;