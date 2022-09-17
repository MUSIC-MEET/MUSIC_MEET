import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import GenreSelector from "../GenreSelector";
import PostList from "./PostList";
import MoreButton from "../MoreButton";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import style from "../SectionStyle";

function Board() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");

    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage]);
    return (
        <section css={style}>
            <Title>{t("title")}</Title>
            <GenreSelector
                board={true}
            />
            {/* <PostList /> */}
            <MoreButton />
        </section>
    );
}


export default Board;