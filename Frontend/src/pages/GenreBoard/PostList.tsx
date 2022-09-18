import { css } from "@emotion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Post from "./Post";

import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useInfiniteQuery } from "react-query";
import fetchPosts from "../../utils/RequestApis/GenreBoard/fetchPosts";
import { useParams } from "react-router-dom";
import { PostType } from "./PostType";


const SIZE = 10;

interface PostListProps {
    list: PostType[] | undefined;
    onScroll?: (e: any) => void;
}

function PostList(props: PostListProps) {
    const { list, onScroll } = props;
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    return (
        <table css={tableStyle}>
            <thead className="wrap table-header">
                <th className="num">{t("list.head.num")}</th>
                <th className="title">{t("list.head.title")}</th>
                <th className="writer">{t("list.head.writer")}</th>
                <th className="time">{t("list.head.time")}</th>
                <th className="view">{t("list.head.view")}</th>
                <th className="vote">{t("list.head.vote")}</th>
            </thead>
            <tbody className="wrap table-content" onScroll={onScroll}>
                {list?.map((post, index) => (
                    <Post
                        key={index}
                        {...post}
                    />
                ))}
            </tbody>

        </table >
    );
}



const tableStyle = css`
    margin-top: 3rem;
    width: 80rem;
    display: flex;
    flex-direction: column;

    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: centr;
    }

    .num{
        width: 10%;
    }

    .title {
        width: 40%;
        /* flex: 5; */
    }

    .writer {
        width: 30%;
        /* flex: 3; */
    }

    .time {
        width: 10%;
        /* flex: 1; */
    }


    .vote {
        width: 10%;
        /* flex: 1; */
    }

    .view {
        width: 10%;
        /* flex: 1; */
    }
    .table-header {
        font-weight: 800;
        height: 32px;
        border-top: 3px solid gray;
        border-bottom: 3px solid gray;
        padding: 1.5rem 0;
    }

    .table-content {
        flex-direction: column;
    }
`;

export default React.memo(PostList);
