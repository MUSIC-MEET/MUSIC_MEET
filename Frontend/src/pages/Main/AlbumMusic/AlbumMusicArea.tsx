import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import MainWrapper from "../MainWrapper";
import AlbumMusicList from "./AlbumMusicList";
import MusicListSub from "../MusicListSub";

function AlbumMusicArea() {
    const { t } = useTranslation<"mainPage">("mainPage");
    const [type, setType] = useState<"latest" | "popular">("latest");
    const typeChangeHandler = useCallback((type: "latest" | "popular") => {
        setType(() => type);
    }, []);
    return (
        <React.Fragment>
            <MainWrapper
                title={t("title.albumMusic")}
                subMenu={
                    <MusicListSub
                        onChange={typeChangeHandler}
                        type={"album"}
                    />
                }
            >
                <AlbumMusicList
                    type={type}
                />
            </MainWrapper>
        </React.Fragment>
    );
}

export default AlbumMusicArea;