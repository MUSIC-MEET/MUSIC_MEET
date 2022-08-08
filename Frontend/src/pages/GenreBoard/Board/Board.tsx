import React, { useEffect } from "react";
import Content from "components/UI/Content";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import { useParams } from "react-router-dom";
import GenreSelector from "./GenreSelector";
import PostList from "./PostList";
import { css } from "@emotion/react";
import MoreButton from "./MoreButton";

function Board() {
    const params = useParams<{ genre: string }>();
    const genre = params.genre ?? "kpop";
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage]);
    return (
        <section css={style}>
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
`;

export default Board;