import AnimationMoreButton from "components/common/AnimationMoreButton";
import CardMusicList from "components/common/CardMusicList";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import fetchAlbumMusicList from "utils/RequestApis/Music/fetchAlbumMusicList";

/**
 * 뮤직 리스트 컴포넌트
 * @params props.type {"latest" | "popular"} 최신순인지 인기순인지
 * @returns 
 */

interface MusicListProps {
    type: "latest" | "popular";
}

function MusicList(props: MusicListProps) {
    console.log(props.type);
    const { data, fetchNextPage, hasNextPage, } =
        useInfiniteQuery(["fetchAlbumMusicList", props.type],
            ({ queryKey, pageParam = 1 }) => fetchAlbumMusicList({ page: pageParam, type: queryKey[1] }),
            {
                cacheTime: 0,
                getNextPageParam: (lastPage, allPages) => {
                    if (lastPage.currentPage < lastPage.endPage)
                        return lastPage.currentPage + 1;
                },
            });
    return (
        <React.Fragment>
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

export default MusicList;