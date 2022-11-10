import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import MusicList from "./MusicList";
import LatestPopular from "components/common/LatestPopular";
import Title from "components/common/Title";
import MoreButton from "components/common/MoreButton";

function List() {

    const { t } = useTranslation<"coverListPage">("coverListPage");
    const [sort, setSort] = useState<"latest" | "popular">("latest");
    const sortChangeHandler = useCallback((sort: "latest" | "popular") => {
        setSort(() => sort);
    }, []);


    return (
        <React.Fragment >
            <Title>{t("title")}</Title>
            <LatestPopular
                type={sort}
                onChange={sortChangeHandler}
            />
            <MusicList
                sort={sort}
            />
            <MoreButton
                writeUrl={"/cover/upload"}
                searchUrl={"/cover/search"}
            />
        </React.Fragment >
    );
}
export default List;