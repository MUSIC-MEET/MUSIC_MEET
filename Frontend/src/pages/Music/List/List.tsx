import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "components/common/Title";
import MusicList from "./MusicList";
import LatestPopular from "components/common/LatestPopular";

/**
 * 앨범 음악 리스트 페이지
 * @returns 
 */
function List() {
    const { t } = useTranslation<"albumMusicListPage">("albumMusicListPage");
    const [type, setType] = useState<"latest" | "popular">("latest");
    const typeChangeHandler = useCallback((type: "latest" | "popular") => {
        console.log(type);
        setType(() => type);
    }, []);
    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <LatestPopular
                type={type}
                onChange={typeChangeHandler}
            />
            <MusicList
                type={type}
            />
        </React.Fragment>
    );
}

export default List;