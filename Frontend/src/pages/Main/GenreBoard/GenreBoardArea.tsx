import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import MainWrapper from "../MainWrapper";
import GenreBoardSub from "./GenreBoardSub";

/**
 * 메인 페이지 장르 게시판 컴포넌트
 * @returns 
 */
function GenreBoardArea() {
    const { t } = useTranslation<"mainPage">("mainPage");
    const [genre, setGenre] = useState<string>("balad");
    const genreChangeHandler = useCallback((_genre: string) => {
        setGenre(() => _genre);
    }, []);
    return (
        <React.Fragment>
            <MainWrapper
                title={t("title.genreBoard")}
                subMenu={
                    <GenreBoardSub
                        onChange={genreChangeHandler}
                    />
                }
            >

            </MainWrapper>
        </React.Fragment>
    );
}

export default GenreBoardArea;