import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Post from "./Post";

function View() {
    const params = useParams();
    const { genre, num } = params;
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    return (
        <section css={sectionStyle}>
            <h1 className="genre_name"><a>{t(`genre.${genre}`)}</a></h1>
            <Post />
        </section>
    );
}


const sectionStyle = css`
    margin-top: 5rem;
    width: 80vw;
    height: 100vh;
    & > .genre_name {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1rem;
    }
`;
export default View;