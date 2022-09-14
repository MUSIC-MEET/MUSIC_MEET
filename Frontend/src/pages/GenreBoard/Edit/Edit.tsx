import Title from "components/common/Title";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import GenreSelector from "../GenreSelector";
import InputForm from "../InputForm";
import style from "../SectionStyle";
import { useQuery } from "react-query";
import CurrentPage from "store/CurrentPage";
import { useSetRecoilState } from "recoil";

function Edit() {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const { t } = useTranslation<"genreWritePage">("genreWritePage");
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(2);
    });


    // const [title, setTitle] = useState<string>("");
    // const [content, setContent] = useState<string>("");



    // const { data } = useQuery(["editboard"], () => { /**  */ },
    //     {

    //     }
    // );

    return (
        <section css={style}>
            <Title>{t("update")}</Title>
            <p>aasdasd</p>
        </section>
    );
}

export default Edit;