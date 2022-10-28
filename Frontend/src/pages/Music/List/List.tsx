import React from "react";
import { useTranslation } from "react-i18next";
import Title from "components/common/Title";
import { useInfiniteQuery } from "react-query";
import fetchAlbumMusicList from "utils/RequestApis/Music/fetchAlbumMusicList";
import CardMusicList from "components/common/CardMusicList";
import AnimationMoreButton from "components/common/AnimationMoreButton";

/**
 * 앨범 음악 리스트 페이지
 * @returns 
 */
function List() {
    const { t } = useTranslation<"albumMusicListPage">("albumMusicListPage");
    const { data, fetchNextPage, hasNextPage, } =
        useInfiniteQuery(["fetchAlbumMusicList"], ({ pageParam = 1 }) => fetchAlbumMusicList(pageParam), {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.currentPage < lastPage.endPage) return lastPage.currentPage + 1;
            }
        });
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <CardMusicList
                list={data?.pages.map((page) => page.data).flat()}
                type={"music"}
            />
            <AnimationMoreButton
                hasNext={hasNextPage}
                onClick={() => fetchNextPage()}
            />
        </React.Fragment>
    );
}

export default List;