import Title from "components/common/Title";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GenreSelector from "../GenreSelector";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import MoreButton from "../../../components/common/MoreButton";
import PostList from "../PostList";
import getSearchList from "utils/RequestApis/GenreBoard/getSearchList";
import { useMutation } from "react-query";

function Search() {
    const { t } = useTranslation<"genreBoardSearchPage">("genreBoardSearchPage");
    const params = useParams<{ type: "title" | "user"; keyword: string; genre: string }>();
    const _type = params.type ?? "title";
    const genre = params.genre ?? "kpop";
    const [type, setType] = useState<string>(_type);
    const [keyword, setKeyword] = useState<string>(params.keyword ?? "");
    const navigator = useNavigate();
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
        navigator(`/board/${genre}/search/${type}/${keyword}`);
    }, [genre, keyword, mutate, navigator, type]);

    const onTypeChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setType(() => e.target.value);
    }, []);
    useEffect(() => {
        if (keyword.length !== 0) {
            mutate({ type, genre, keyword });
        }
    }, [mutate, genre, type]);

    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <GenreSelector
                search={true}
                searchType={_type}
            />
            <SearchBar
                keyword={keyword}
                onChange={onChangeKeyWord}
                onSubmit={onSubmit}
                type={type}
                typeChange={onTypeChangeHandler}
            />
            <PostList
                list={data}
            />
            <MoreButton
                writeUrl={`/board/${genre}/write`}
                searchUrl={`/board/${genre}/search/title`}
            />
        </React.Fragment>
    );
}

export default Search;