import AnimationMoreButton from "components/common/AnimationMoreButton";
import CardMusicList from "components/common/CardMusicList";
import Title from "components/common/Title";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import fetchCoverMusicList from "utils/RequestApis/Cover/fetchCoverMusicList";
import MoreButton from "components/common/MoreButton";

function List() {

    const { t } = useTranslation<"coverListPage">("coverListPage");
    const { data, fetchNextPage, hasNextPage, } =
        useInfiniteQuery(["fetchCoverMusicList"], ({ pageParam = 1 }) => fetchCoverMusicList(pageParam), {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.currentPage < lastPage.endPage) return lastPage.currentPage + 1;

            },
        });
    const setCurrentPage = useSetRecoilState(CurrentPage);
    // const queryClient = useQueryClient();
    useEffect(() => {
        setCurrentPage(4);
        return () => {
            // queryClient.removeQueries("fetchCoverMusicList");
        };
    }, [setCurrentPage]);
    return (
        <React.Fragment >
            <Title>{t("title")}</Title>
            <CardMusicList
                list={data?.pages.map((page) => page.data).flat()}
                type={"cover"}
            />
            <AnimationMoreButton
                hasNext={hasNextPage}
                onClick={() => fetchNextPage()}
            />
            <MoreButton
                writeUrl={"/cover/upload"}
                searchUrl={"/cover/search"}
            />
        </React.Fragment >
    );
}
export default List;