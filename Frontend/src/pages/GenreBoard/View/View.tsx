import { css } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./Post";
import CurrentPage from "store/CurrentPage";
import { useSetRecoilState } from "recoil";

function View() {
    const setCurrentPage = useSetRecoilState(CurrentPage);
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "0";
    console.log(num);
    useEffect(() => {
        setCurrentPage(1);
    });
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const navigator = useNavigate();
    return (
        <section css={sectionStyle}>
            <h1 className="genre-name"><a onClick={() => navigator(`/board/${genre}`)}>{t(`genre.${genre}`)}</a></h1>
            <Post />
        </section>
    );
}


const sectionStyle = css`
    margin-top: 5rem;
    width: 80vw;
    height: 100vh;
    & > .genre-name {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1rem;
        cursor: pointer;
    }
`;
export default View;