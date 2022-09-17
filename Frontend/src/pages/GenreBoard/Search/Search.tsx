import Title from "components/common/Title";
import React, { useCallback, useState } from "react";
import style from "../SectionStyle";
import { useTranslation } from "react-i18next";
import GenreSelector from "../GenreSelector";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import MoreButton from "../MoreButton";

function Search() {
    const { t } = useTranslation<"genreBoardSearchPage">("genreBoardSearchPage");
    const params = useParams<{ type: "title" | "user"; keyword: string }>();
    const type = params.type ?? "title";
    const [keyword, setKeyword] = useState<string>(params.keyword ?? "");

    const onChangeKeyWord = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(() => e.target.value);
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, []);

    return (
        <section css={style}>
            <Title>{t("title")}</Title>
            <GenreSelector
                search={true}
                searchType={type}
            />
            <SearchBar
                keyword={keyword}
                onChange={onChangeKeyWord}
                onSubmit={onSubmit}
            />
            <MoreButton />
        </section>
    );
}

export default React.memo(Search);