import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import MainWrapper from "../MainWrapper";
import MusicListSub from "../MusicListSub";
import CoverMusicList from "./CoverMusicList";

function CoverMusicArea() {
    const { t } = useTranslation<"mainPage">("mainPage");
    const [type, setType] = useState<"latest" | "popular">("latest");
    const typeChangeHandler = useCallback((type: "latest" | "popular") => {
        setType(() => type);
    }, []);
    return (
        <React.Fragment>
            <MainWrapper
                title={t("title.coverMusic")}
                subMenu={
                    <MusicListSub
                        onChange={typeChangeHandler}
                    />
                }
            >
                <CoverMusicList
                    type={type}
                />
            </MainWrapper>
        </React.Fragment>
    );
}

export default CoverMusicArea;