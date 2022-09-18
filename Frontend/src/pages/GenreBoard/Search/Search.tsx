import Title from "components/common/Title";
import React, { useCallback, useState } from "react";
import style from "../SectionStyle";
import { useTranslation } from "react-i18next";
import GenreSelector from "../GenreSelector";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import MoreButton from "../MoreButton";
import PostList from "../PostList";
import getSearchList from "utils/RequestApis/GenreBoard/getSearchList";
import { useMutation } from "react-query";
import { PostType } from "../PostType";

function Search() {
    const { t } = useTranslation<"genreBoardSearchPage">("genreBoardSearchPage");
    const params = useParams<{ type: "title" | "user"; keyword: string; genre: string }>();
    const type = params.type ?? "title";
    const genre = params.genre ?? "kpop";
    const [keyword, setKeyword] = useState<string>(params.keyword ?? "");
    const { data, mutate } = useMutation(getSearchList, {
        useErrorBoundary: false,
        retry: 0
    });
    const onChangeKeyWord = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(() => e.target.value);
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword === "") return;
        mutate({ type, genre, keyword });
    }, [genre, keyword, mutate, type]);

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
            <PostList
                list={data}
            />
            <MoreButton />
        </section>
    );
}

export default Search;