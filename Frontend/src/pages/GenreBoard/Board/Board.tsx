import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";

import GenreSelector from "../GenreSelector";
import { PostType } from "../PostType";
import MoreButton from "../MoreButton";
import Title from "components/common/Title";
import { useTranslation } from "react-i18next";
import style from "../SectionStyle";
import { useParams } from "react-router-dom";
import PostList from "../PostList";
import getPosts from "utils/RequestApis/GenreBoard/getPosts";
import Button from "components/common/Button";
import { css } from "@emotion/react";
import { useQuery, useQueryClient } from "react-query";

function Board() {
    const { t } = useTranslation<"genreBoardPage">("genreBoardPage");
    const { genre } = useParams<{ genre: string }>();
    const [page, setPage] = useState<number>(1);
    const [list, setList] = useState<PostType[]>([]);
    const queryClient = useQueryClient();
    const { refetch } = useQuery(["getPosts"], () => getPosts({ genre: genre ?? "kpop", page }), {
        suspense: true,
        useErrorBoundary: false,
        onSuccess: (res) => {
            setList((prev) => prev.concat(res));
            setPage((prevPage) => prevPage + 1);
        }
    });

    useLayoutEffect(() => {
        refetch();
    }, [genre]);

    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <GenreSelector
                board={true}
            />

            {/* <React.Fragment> */}
            <PostList

                list={list}
            />
            <Button
                value="More +"
                w={"5rem"}
                h={"3rem"}
                css={getMorePostButtonStyle}
                onClick={() => { refetch(); }}
            />

            {/* </React.Fragment> */}


            <MoreButton />
        </React.Fragment>
    );
}

const getMorePostButtonStyle = css`
    margin-top: 1.5rem;
`;


// eslint-disable-next-line react/display-name
export default React.memo(Board, (prevProps, nextProps) => prevProps !== nextProps);