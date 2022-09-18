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
}

function PostList(props: PostListProps) {
    const { list } = props;
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    return (
        <div css={tableStyle}>
            <div className="wrap table-header">
                <span className="num">{t("list.head.num")}</span>
                <span className="title">{t("list.head.title")}</span>
                <span className="writer">{t("list.head.writer")}</span>
                <span className="time">{t("list.head.time")}</span>
                <span className="view">{t("list.head.view")}</span>
                <span className="vote">{t("list.head.vote")}</span>
            </div>
            {list?.map((post, index) => (
                <Post
                    key={index}
                    {...post}
                />
            ))}
        </div >
    );
}

const Row = ({ data, style, index, isScrolling }: any) => {
    // props의 구조는 { data, style, index, isScrolling }으로 되어있다.
    console.log("row");
    console.log(data[index]);
    return (
        <Post
            style={style}
            {...data[index]}
        />
    );
};


const tableStyle = css`
    margin-top: 3rem;
    min-width: 1024px;

    display: flex;
    flex-direction: column;

    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: scroll;
    }

    .wrap > span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .num{
        flex: 1;
    }

    .vote {
        flex: 1;
    }

    .view {
        flex: 1;
    }

    .title {
        flex: 5;
    }

    .writer {
        flex: 3;
    }

    .time {
        flex: 1;
    }

    .table-header {
        font-weight: 800;
        height: 32px;
        border-top: 3px solid gray;
        border-bottom: 3px solid gray;
        padding: 1.5rem;
    }

`;

export default React.memo(PostList);
