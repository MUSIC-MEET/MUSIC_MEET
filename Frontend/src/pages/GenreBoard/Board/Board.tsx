import React from "react";
import GenreSelector from "../GenreSelector";
import MoreButton from "components/common/MoreButton";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PostList from "../PostList";
import getPosts from "utils/RequestApis/GenreBoard/getPosts";

import { useInfiniteQuery } from "react-query";
import AnimationMoreButton from "components/common/AnimationMoreButton";

function Board() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const { genre } = useParams<{ genre: string }>();
    const { data, fetchNextPage, hasNextPage } =
        useInfiniteQuery(["getBoardList", genre],
            ({ queryKey, pageParam = 1 }) => getPosts({ genre: queryKey[1] ?? "kpop", page: pageParam }),
            {
                getNextPageParam: (lastPage, allPages) => {
                    if (lastPage.currentPage < lastPage.endPage) {
                        return lastPage.currentPage + 1;
                    }
                },
            });
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <GenreSelector
                board={true}
            />
            <PostList
                list={data?.pages.map((page) => page.data).flat()}
            />
            <AnimationMoreButton
                hasNext={hasNextPage}
                onClick={() => { fetchNextPage(); }}
            />

            <MoreButton
                writeUrl={`/board/${genre}/write`}
                searchUrl={`/board/${genre}/search/title`}
            />
        </React.Fragment>
    );
}


// eslint-disable-next-line react/display-name
export default React.memo(Board, (prevProps, nextProps) => prevProps !== nextProps);