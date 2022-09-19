import { css } from "@emotion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Post from "./Post";
import { PostType } from "./PostType";

interface PostListProps {
    list: PostType[] | undefined;
    onScroll?: (e: any) => void;
}

function PostList(props: PostListProps) {
    const { list, onScroll } = props;
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");

    useEffect(() => {
        //
    }, [list]);
    return (
        <table css={tableStyle}>
            <thead className="wrap table-header">
                <tr className="num">
                    <th>{t("list.head.num")}</th>
                </tr>
                <tr className="title">
                    <th>{t("list.head.title")}</th>
                </tr>
                <tr className="writer">
                    <th>{t("list.head.writer")}</th>
                </tr>
                <tr className="time">
                    <th>{t("list.head.time")}</th>
                </tr>
                <tr className="view">
                    <th>{t("list.head.view")}</th>
                </tr>
                <tr className="vote">
                    <th>{t("list.head.vote")}</th>
                </tr>
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
    width: 80vw;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;

    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: centr;
    }

    tr {
        display: flex;
        justify-content: center;
        align-items: center;
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

export default PostList;
