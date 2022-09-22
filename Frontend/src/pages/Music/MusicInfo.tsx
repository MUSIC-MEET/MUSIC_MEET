import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import fetchMusicInfo from "utils/RequestApis/Music/fetchMusicInfo";

function MusicInfo({ musicNum }: { musicNum: string }) {

    useEffect(() => {
        //
    }, [musicNum]);

    const { data } =
        useQuery(
            ["musicInfo", musicNum],
            () => fetchMusicInfo({ musicNum }),
            {
                retry: 0
            });
    return (
        <section css={style}>
            {data?.imgSrc}
            {data?.title}
            {data?.singer}
            {data?.realseData}
            {data?.lyrics}
            {data?.vote}
            {data?.genre}
        </section>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
`;

export default MusicInfo;