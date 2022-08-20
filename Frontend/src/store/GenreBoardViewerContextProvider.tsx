import React, { useState } from "react";
import GenreBoardContext from "./GenreBoardContext";
import { GenreBoardViewerContextType } from "./GenreBoardViewerContext";

function GenreBoardViewerProvider(props: { children: React.ReactNode }) {
    const [genre, setGenre] = useState<string>("kpop");
    const [num, setNum] = useState<string>("0");

    const setGenreHandler = (genre: string) => {
        setGenre(() => genre);
    };
    const setNumHandler = (num: string) => {
        setNum(() => num);
    };

    const obj: GenreBoardViewerContextType = {
        genre,
        num,
        setGenre: setGenreHandler,
        setNum: setNumHandler
    };

    return (
        <GenreBoardContext.Provider value={obj}>
            {props.children}
        </GenreBoardContext.Provider>
    );
}

export default GenreBoardViewerProvider;