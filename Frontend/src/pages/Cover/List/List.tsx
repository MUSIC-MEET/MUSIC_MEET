import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import MusicList from "./MusicList";
import LatestPopular from "components/common/LatestPopular";
import Title from "components/common/Title";
import MoreButton from "components/common/MoreButton";

function List() {

    const { t } = useTranslation<"coverListPage">("coverListPage");
    const [type, setType] = useState<"latest" | "popular">("latest");
    const typeChangeHandler = useCallback((type: "latest" | "popular") => {
        setType(() => type);
    }, []);


    return (
        <React.Fragment >
            <Title>{t("title")}</Title>
            <LatestPopular
                type={type}
                onChange={typeChangeHandler}
            />
            <MusicList
                type={type}
            />
            <MoreButton
                writeUrl={"/cover/upload"}
                searchUrl={"/cover/search"}
            />
        </React.Fragment >
    );
}
export default List;