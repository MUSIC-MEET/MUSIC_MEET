import AnimationMoreButton from "components/common/AnimationMoreButton";
import CardMusicList from "components/common/CardMusicList";
import Title from "components/common/Title";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import fetchCoverMusicList from "utils/RequestApis/Cover/fetchCoverMusicList";
import MoreButton from "components/common/MoreButton";
import MusicList from "./MusicList";
import LatestPopular from "components/common/LatestPopular";

function List() {
    const setCurrentPage = useSetRecoilState(CurrentPage);
    // const queryClient = useQueryClient();
    useEffect(() => {
        setCurrentPage(4);
        return () => {
            // queryClient.removeQueries("fetchCoverMusicList");
        };
    }, [setCurrentPage]);
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