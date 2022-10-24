import { css } from "@emotion/react";
import Genre from "pages/GenreBoard/Genre";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/**
 * 메인 페이지 장르게시판 서브메뉴 컴포넌트
 * @returns 
 */
function GenreBoardSub(props: { onChange: (type: string) => void }) {
    const { t } = useTranslation<"mainPage">("mainPage");
    const { t: t2 } = useTranslation<"genreBoardPage">("genreBoardPage");
    const genreList: Genre[] = useMemo(() => [
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
        { id: 11, name: "ost", text: t("genre.ost") },
    ], [t]);
    const navigator = useNavigate();
    return (
        <div css={style}>
            <ul css={ulStyle}>
                {genreList.map((genre) => (
                    <li
                        onClick={(() => props.onChange(genre.name))}
                        key={genre.id}
                    >
                        {t2(`${genre.text}`)}
                    </li>
                ))}
            </ul>
            <span
                onClick={() => navigator("/board/kpop")}

            >
                {t("more")}
            </span>
        </div>
    );
}
const style = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

`;
const ulStyle = css`
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;

    li {
        cursor: pointer;
    }

    li::after {
        content: " | ";
        white-space: pre;
    }

    li:last-child::after {
        content: "";
    }
`;
// const spanStyle = css`
//     position: absolute;
//     right: 0;
//     cursor: pointer;
// `;

export default GenreBoardSub;