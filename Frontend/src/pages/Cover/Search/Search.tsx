import React, { useCallback, useEffect, useState } from "react";
import Title from "components/common/Title";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PostSearchForm from "components/common/PostSearchForm";
import { useInfiniteQuery } from "react-query";
import fetchSearchList from "utils/RequestApis/Cover/fetchSearchList";
import CardMusicList from "components/common/CardMusicList";
import AnimationMoreButton from "components/common/AnimationMoreButton";

function Search() {
    const { t } = useTranslation<"coverSearchPage">("coverSearchPage");
    const params = useParams<{ type: string; keyword: string }>();
    const [type, setType] = useState<string>(params.type ?? "title");
    const [keyword, setKeyword] = useState<string>(params.keyword ?? "");
    const navigator = useNavigate();
    const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(["fetchCoverSearchList", type],
        ({ queryKey, pageParam = 1 }) =>
            fetchSearchList({ type: queryKey[1], keyword: keyword, page: pageParam }),
        {
            enabled: false,
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.currentPage < lastPage.endPage) {
                    return lastPage.currentPage + 1;
                }
            }
        }
    );
    const typeChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(() => e.target.value);
    }, []);

    const keywordChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(() => e.target.value);
    }, []);

    const onSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword === "") return;
        navigator(`/cover/search/${type}/${keyword}`);
    }, [keyword, navigator, type]);

    useEffect(() => {
        if (keyword.length !== 0) {
            refetch();
        }
    }, [refetch]);


    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <PostSearchForm
                type={type}
                keyword={keyword}
                onChangeType={typeChangeHandler}
                onChangeKeyword={keywordChangeHandler}
                onSubmit={onSubmitHandler}
            />
            <CardMusicList
                type={"cover"}
                list={data?.pages.map((page) => page.data).flat()}
            />
            <AnimationMoreButton
                onClick={() => fetchNextPage()}
                hasNext={hasNextPage}
            />
        </React.Fragment>
    );
}

export default Search;