import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import GenreSelector from "../GenreSelector";
import { PostType } from "../PostType";
import MoreButton from "../MoreButton";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import style from "../SectionStyle";
import { useParams } from "react-router-dom";
import PostList from "../PostList";
import getSearchList from "utils/RequestApis/GenreBoard/getSearchList";
import { useMutation } from "react-query";

function Board() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const params = useParams<{ genre: string }>();
    const genre = params.genre ?? "kpop";

    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage]);


    const list: PostType[] = [];
    return (
        <section css={style}>
            <Title>{t("title")}</Title>
            <GenreSelector
                board={true}
            />
            <PostList
                list={list}
            />
            <MoreButton />
        </section>
    );
}


export default Board;