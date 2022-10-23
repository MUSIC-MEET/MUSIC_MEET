import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import MainWrapper from "../MainWrapper";
import AlbumMusic from "./AlbumMusic";
import AlbumMusicSub from "./AlbumMusicSub";

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
                    <AlbumMusicSub
                        onChange={typeChangeHandler}
                    />
                }
            >
                <AlbumMusic
                    type={type}
                />
            </MainWrapper>
        </React.Fragment>
    );
}

export default AlbumMusicArea;