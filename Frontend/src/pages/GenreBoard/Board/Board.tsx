import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import { useParams } from "react-router-dom";
import GenreSelector from "../GenreSelector";
import PostList from "./PostList";
import { css } from "@emotion/react";
import MoreButton from "./MoreButton";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";

function Board() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const params = useParams<{ genre: string }>();
    const genre = params.genre ?? "kpop";
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage]);
    return (
        <section css={style}>
            <Title>{t("title")}</Title>
            <GenreSelector
                genre={genre}
            />
            <PostList />
            <MoreButton />
        </section>
    );
}

const style = css`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    & > h1 {
        width: 100%;
        text-align:center;
    }
`;

export default Board;