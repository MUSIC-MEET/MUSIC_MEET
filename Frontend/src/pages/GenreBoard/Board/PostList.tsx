import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import Post from "./Post";

interface PostType {
    id: string;
    title: string;
    writer: string;
    time: string;
    view: string;
    vote: string
}

function PostList() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");



    const DUMY_POST_LIST: PostType[] = [
        { id: "0", title: "제목1", writer: "admin", time: "1분전", view: "1000", vote: "500" },
        { id: "1", title: "제목2", writer: "admin", time: "1분전", view: "1000", vote: "500" },
        { id: "2", title: "제목3", writer: "admin", time: "1분전", view: "1000", vote: "500" },
        { id: "3", title: "제목4", writer: "adminaaaaaa", time: "14분전", view: "133330", vote: "500" },
        { id: "4", title: "제목5", writer: "admins", time: "12분전", view: "1000", vote: "500" },
        { id: "5", title: "제목6", writer: "admisn", time: "13분전", view: "1000", vote: "500" },
        { id: "6", title: "제목7", writer: "admidn", time: "51분전", view: "1000", vote: "500" },
        { id: "7", title: "제목8", writer: "admidn", time: "52분전", view: "1000", vote: "500" },
        { id: "8", title: "제목9", writer: "admidn", time: "53분전", view: "1000", vote: "500" },
        { id: "9", title: "제목10", writer: "admidn", time: "54분전", view: "1000", vote: "500" },
        { id: "10", title: "제목11", writer: "admidn", time: "55분전", view: "1000", vote: "500" },
        { id: "11", title: "제목12", writer: "admidn", time: "56분전", view: "1000", vote: "500" },
        { id: "12", title: "제목13", writer: "admidn", time: "57분전", view: "1000", vote: "500" },
        { id: "13", title: "제목14", writer: "admidn", time: "58분전", view: "1000", vote: "500" },
        { id: "14", title: "제목15", writer: "admidn", time: "59분전", view: "1000", vote: "500" },
        // { id: "15", title: "제목16", writer: "admidn", time: "60분전", view: "1000", vote: "500" },

    ];

    return (
        <table css={tableStyle}>
            <thead>
                <tr>
                    <th className="num">{t("list.head.num")}</th>
                    <th className="title">{t("list.head.title")}</th>
                    <th className="writer">{t("list.head.writer")}</th>
                    <th className="time">{t("list.head.time")}</th>
                    <th className="view">{t("list.head.view")}</th>
                    <th className="vote">{t("list.head.vote")}</th>
                </tr>
            </thead>
            <tbody>
                {DUMY_POST_LIST.map((post) => (
                    <Post
                        key={post.id}
                        {...post}
                    />
                ))}
            </tbody>
        </table>
    );
}

const tableStyle = css`
    margin-top: 3rem;
    min-width: 80rem;

    .num{
        width: 10%;
    }

    .vote {
        width: 5%;
    }
    .view {
        width: 5%;
    }

    .title {
        width: 50%;
    }

    .writer {
        width: 10%;
    }

    .time {
        width: 20%;
    }


    & > thead {
        border-top: 3px solid gray;
        border-bottom: 3px solid gray;
    }
    & thead > tr > th {
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-weight: 800;
    }
`;

export default PostList;
export { PostType };