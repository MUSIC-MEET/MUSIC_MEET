import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Post from "./Post";

import { FixedSizeList } from "react-window";


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
    const DUMY_POST_LIST: PostType[] = useMemo(() => [
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
        { id: "15", title: "제목16", writer: "admidn", time: "60분전", view: "1000", vote: "500" },
        { id: "16", title: "제asdasdasdasdsad목17", writer: "admidn", time: "61분전", view: "1000", vote: "500" },
        { id: "17", title: "제목18", writer: "admidn", time: "62분전", view: "1000", vote: "500" },
        { id: "18", title: "제목19", writer: "admidn", time: "63분전", view: "1000", vote: "500" },
        { id: "19", title: "제목20", writer: "admidn", time: "64분전", view: "1000", vote: "500" },
        { id: "20", title: "제목21", writer: "admidn", time: "65분전", view: "1000", vote: "500" },
        { id: "21", title: "제목22", writer: "admidn", time: "66분전", view: "1000", vote: "500" },
        { id: "22", title: "제목23", writer: "admidn", time: "67분전", view: "1000", vote: "500" },
        { id: "23", title: "제목24", writer: "admidn", time: "68분전", view: "1000", vote: "500" },
        { id: "24", title: "제목25", writer: "admidn", time: "69분전", view: "1000", vote: "500" },
        { id: "25", title: "제목26", writer: "admidn", time: "70분전", view: "1000", vote: "500" },
        { id: "26", title: "제목27", writer: "admidn", time: "71분전", view: "1000", vote: "500" },
        { id: "27", title: "제목28", writer: "admidn", time: "72분전", view: "1000", vote: "500" },
        { id: "28", title: "제목29", writer: "admidn", time: "73분전", view: "1000", vote: "500" },
        { id: "29", title: "제목30", writer: "admidn", time: "74분전", view: "1000", vote: "500" },
        { id: "30", title: "제목31", writer: "admidn", time: "75분전", view: "1000", vote: "500" },
        { id: "31", title: "제목32", writer: "admidn", time: "76분전", view: "1000", vote: "500" },
        { id: "32", title: "제목33", writer: "admidn", time: "77분전", view: "1000", vote: "500" },

    ], []);


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


            <FixedSizeList
                height={480}
                // 아이템이 보이는 곳의 크기
                itemCount={DUMY_POST_LIST.length}
                // 아이템 개수
                itemSize={48}
                // 아이템 높이
                width={1024}
                // 아이템 보이는 곳의 넓이
                itemData={DUMY_POST_LIST}

            >
                {Row}
            </FixedSizeList>
        </div >
    );
}

const Row = ({ data, style, index, isScrolling }: any) => {
    // props의 구조는 { data, style, index, isScrolling }으로 되어있다.

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
    }

`;

export default PostList;
export { PostType };