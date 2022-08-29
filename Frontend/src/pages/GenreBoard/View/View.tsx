import { css } from "@emotion/react";
import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./Post";
import CurrentPage from "store/CurrentPage";
import { useSetRecoilState } from "recoil";
import Loading from "components/common/Loading";
import ErrorBoundary from "../ErrorBoundary";
import Comments from "./Comments";

function View() {
    const setCurrentPage = useSetRecoilState(CurrentPage);
    const params = useParams();
    const genre = params.genre ?? "kpop";

    useEffect(() => {
        setCurrentPage(2);
    });
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const navigator = useNavigate();
    return (
        <section css={sectionStyle}>
            <h1 className="genre-name"><a onClick={() => navigator(`/board/${genre}`)}>{t(`genre.${genre}`)}</a></h1>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <Post />
                </Suspense>
            </ErrorBoundary>
            <Comments />
        </section>
    );
}


const sectionStyle = css`
    margin-top: 5rem;
    width: 80vw;
    height: 100%;
    & > .genre-name {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1rem;
        cursor: pointer;
    }
`;
export default React.memo(View);