import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import CurrentPage from "store/CurrentPage";
import GenreSelector from "../GenreSelector";
import { PostType } from "../PostType";
import MoreButton from "../MoreButton";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import style from "../SectionStyle";
import { useParams } from "react-router-dom";
import PostList from "../PostList";
import getSearchList from "utils/RequestApis/GenreBoard/getSearchList";
import { useMutation, useQuery } from "react-query";
import getPosts from "utils/RequestApis/GenreBoard/getPosts";
import Button from "components/common/Button";
import { css } from "@emotion/react";

function Board() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const params = useParams<{ genre: string }>();
    const genre = params.genre ?? "kpop";
    const listRef = useRef<any>(null);
    const setCurrentPage = useSetRecoilState(CurrentPage);
    const [scroll, setScroll] = useState(0);
    const [page, setPage] = useState<number>(1);
    const [list, setList] = useState<PostType[]>([]);

    const { refetch } = useQuery(["getBoards"], () => getPosts({ genre, page }),
        {
            retry: 0,
            suspense: false,
            onSuccess: (res) => {
                setList(() => list.concat(res));
                setPage(() => page + 1);
            }
        }
    );

    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage]);


    return (
        <div css={style} ref={listRef} >
            <Title>{t("title")}</Title>
            <GenreSelector
                board={true}
            />
            <PostList
                list={list}
            />
            <Button
                value="More +"
                w={"5rem"}
                h={"3rem"}
                css={getMorePostButtonStyle}
                onClick={() => refetch()}
            />
            <MoreButton />
        </div>
    );
}

const getMorePostButtonStyle = css`
    margin-top: 1.5rem;
`;


export default Board;