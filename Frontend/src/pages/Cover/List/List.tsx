import CardMusicList from "components/common/CardMusicList";
import Title from "components/common/Title";
import React from "react";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "react-query";
import fetchCoverMusicList from "utils/RequestApis/Cover/fetchCoverMusicList";

function List() {
    const { t } = useTranslation<"coverListPage">("coverListPage");
    const { data, fetchNextPage } =
        useInfiniteQuery(["fetchCoverMusicList"], ({ pageParam = 1 }) => fetchCoverMusicList(pageParam), {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.currentPage + 1;
            },
        });
    return (
        <React.Fragment >
            <Title>{t("title")}</Title>
            <CardMusicList
                list={data}
            />
            <button onClick={() => fetchNextPage()}></button>
        </React.Fragment >
    );
}

export default List;