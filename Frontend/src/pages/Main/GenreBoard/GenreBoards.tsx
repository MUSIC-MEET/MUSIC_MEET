import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import fetchLatestPosts from "utils/RequestApis/Main/fetchLatestPosts";
import fetchPopularPosts from "utils/RequestApis/Main/fetchPopularPosts";
import PostList from "./PostList";
import { useTranslation } from "react-i18next";

interface GenreBoardsProps {
    genre: string;
}

function GenreBoards(props: GenreBoardsProps) {
    const { t } = useTranslation<"mainPage">("mainPage");
    const COUNT = useMemo(() => 5, []);
    const { data: latestData } =
        useQuery(["fetchLatestPosts", props.genre], () => fetchLatestPosts({ genre: props.genre, count: COUNT }));
    const { data: popularData } =
        useQuery(["fetchPopularPosts", props.genre], () => fetchPopularPosts({ genre: props.genre, count: COUNT }));
    return (
        <div css={style}>
            <PostList
                list={latestData}
                className="lst latest"
                genre={props.genre}
                text={t("type.latest")}
            />
            <PostList
                list={popularData}
                className="lst popular"
                genre={props.genre}
                text={t("type.popular")}
            />
        </div>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    width: 100%;

    & > .lst {
        width: 95%;
    }

    & > .lst:first-of-type {
        margin-right: 1rem;
    }

`;

export default GenreBoards;