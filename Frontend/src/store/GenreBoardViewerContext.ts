import React from "react";

interface GenreBoardViewerContextType {
    genre: string;
    setGenre: (genre: string) => void;
    num: string;
    setNum: (num: string) => void;
}

const GenreBoardViewerContext = React.createContext<GenreBoardViewerContextType>(
    {
        genre: "kpop",
        setGenre: (genre: string) => {
            //
        },
        num: "",
        setNum: (num: string) => {
            //
        }
    }
);

export default GenreBoardViewerContext;
export { GenreBoardViewerContextType };