import Title from "components/common/Title";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GenreSelector from "../GenreSelector";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import PostList from "../PostList";
import getSearchList from "utils/RequestApis/GenreBoard/getSearchList";
import { useInfiniteQuery } from "react-query";
import AnimationMoreButton from "components/common/AnimationMoreButton";
import PostSearchForm from "components/common/PostSearchForm";

function Search() {
    const { t } = useTranslation<"genreBoardSearchPage">("genreBoardSearchPage");
    const params = useParams<{ type: "title" | "user"; keyword: string; genre: string }>();
    const _type = params.type ?? "title";
    const genre = params.genre ?? "kpop";
    const [type, setType] = useState<string>(_type);
    const [keyword, setKeyword] = useState<string>(params.keyword ?? "");
    const navigator = useNavigate();

    const { data, fetchNextPage, hasNextPage, refetch } =
        useInfiniteQuery(["fetchGenreBoardSearchList", type, genre],
            ({ queryKey, pageParam = 1 }) => getSearchList(
                { type: queryKey[1], keyword: keyword, genre: queryKey[2], page: pageParam }
            ),
            {
                enabled: false,
                getNextPageParam: (lastPage, allPages) => {
                    if (lastPage.currentPage < lastPage.endPage) {
                        return lastPage.currentPage + 1;
                    }
                }
            }
        );

    const onChangeKeyWord = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(() => e.target.value);
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword === "") return;
        refetch();
        navigator(`/board/${genre}/search/${type}/${keyword}`);
    }, [genre, keyword, navigator, refetch, type]);

    const onTypeChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setType(() => e.target.value);
    }, []);
    useEffect(() => {
        if (keyword.length !== 0) {
            refetch();
        }
    }, [refetch]);

    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <GenreSelector
                search={true}
                searchType={_type}
            />
            <PostSearchForm
                type={type}
                keyword={keyword}
                onChangeType={onTypeChangeHandler}
                onChangeKeyword={onChangeKeyWord}
                onSubmit={onSubmit}
            />
            <PostList
                list={data?.pages.map((page) => page.data).flat()}
            />
            <AnimationMoreButton
                hasNext={hasNextPage}
                onClick={() => { fetchNextPage(); }}
            />
        </React.Fragment>
    );
}

export default Search;