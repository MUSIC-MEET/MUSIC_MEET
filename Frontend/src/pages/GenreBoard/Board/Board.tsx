import React, { useEffect } from "react";
import Content from "components/UI/Content";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import { useParams } from "react-router-dom";
import GenreSelector from "./GenreSelector";

function Board() {
    const params = useParams<{ genre: string }>();
    const genre = params.genre ?? "kpop";
    const setCurrentPage = useSetRecoilState(CurrentPage);
    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage]);
    return (
        <Content>
            <GenreSelector
                genre={genre}
            />
        </Content>
    );
}

export default Board;