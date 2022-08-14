import React, { useState } from "react";
import GenreBoardContext, { GenreBoardContextType }
    from "./GenreBoardContext";

function GenreBoardContextProvider(props: { children: React.ReactNode }) {
    const [genre, setGenre] = useState<string>("kpop");
    const setGenreHandler = (genre: string) => {
        setGenre(() => genre);
    };
    const obj: GenreBoardContextType = {
        genre,
        setGenre: setGenreHandler
    };

    return (
        <GenreBoardContext.Provider value={obj}>
            {props.children}
        </GenreBoardContext.Provider>
    );
}

export default GenreBoardContextProvider;