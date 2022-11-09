import AnimationMoreButton from "components/common/AnimationMoreButton";
import CardMusicList from "components/common/CardMusicList";
import React from "react";
import { useInfiniteQuery } from "react-query";
import fetchCoverMusicList from "utils/RequestApis/Cover/fetchCoverMusicList";

interface MusicListProps {
    type: "latest" | "popular";
}

/**
 * 커버 리스트 컴포넌트
 * @params props.type {"latest" | "popular"} 최신순인지 인기순인지
 * @returns 
 */
function MusicList(props: MusicListProps) {
    const { data, fetchNextPage, hasNextPage, } =
        useInfiniteQuery(["fetchCoverMusicList", props.type],
            ({ queryKey, pageParam = 1 }) => fetchCoverMusicList({ page: pageParam, type: queryKey[1] }),
            {
                cacheTime: 0,
                getNextPageParam: (lastPage, allPages) => {
                    if (lastPage.currentPage < lastPage.endPage) return lastPage.currentPage + 1;
                },
            });
    return (
        <React.Fragment>
            <CardMusicList
                list={data?.pages.map((page) => page.data).flat()}
                type={"cover"}
            />
            <AnimationMoreButton
                hasNext={hasNextPage}
                onClick={() => fetchNextPage()}
            />
        </React.Fragment>
    );
}

export default MusicList;