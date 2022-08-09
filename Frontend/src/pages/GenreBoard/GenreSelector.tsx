import styled from "@emotion/styled";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GenreButton from "./GenreButton";

interface GenreType {
    id: number;
    name: string;
    text: string;
}

function GenreSelector({ genre, board, write }: { genre: string, board?: boolean, write?: boolean }) {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const genreList: GenreType[] = useMemo(() => [
        { id: 0, name: "balad", text: t("genre.balad") },
        { id: 1, name: "rnb", text: t("genre.rnb") },
        { id: 2, name: "hiphop", text: t("genre.hiphop") },
        { id: 3, name: "trort", text: t("genre.trort") },
        { id: 4, name: "kpop", text: t("genre.kpop") },
        { id: 5, name: "jpop", text: t("genre.jpop") },
        { id: 6, name: "pop", text: t("genre.pop") },
        { id: 7, name: "classic", text: t("genre.classic") },
        { id: 8, name: "dance", text: t("genre.dance") },
        { id: 9, name: "mr", text: t("genre.mr") },
        { id: 10, name: "jazz", text: t("genre.jazz") },
    ], [t]);
    return (
        <List>
            {genreList.map((_genre) => (
                <GenreButton
                    key={_genre.id}
                    name={_genre.name}
                    text={_genre.text}
                    isSelected={_genre.name === genre}
                    board={board}
                    write={write}
                />
            ))}
        </List>
    );
}

const List = React.memo(styled.ul`
    width: 100vw;
    min-height: 3rem;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content:  center;
    align-items: center;
    overflow: scroll;
`);

export default React.memo(GenreSelector);