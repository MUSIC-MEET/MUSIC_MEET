import React from "react";

interface GenreBoardContextType {
    genre: string;
    setGenre: (genre: string) => void;
}

const GenreBoardContext = React.createContext<GenreBoardContextType>(
    {
        genre: "kpop",
        setGenre: (genre: string) => { 
            // 
        }
    }
);

export default GenreBoardContext;
export { GenreBoardContextType };