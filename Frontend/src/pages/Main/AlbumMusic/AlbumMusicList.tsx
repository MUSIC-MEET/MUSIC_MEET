import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import MusicList from "../MusicList";
import fetchAlbumMusic from "utils/RequestApis/Main/fetchAlbumMusic";

interface AlbumMusicListProps {
    type: "latest" | "popular";
}

function AlbumMusicList(props: AlbumMusicListProps) {
    const { data } = useQuery(["fetchAlbumMusic", props.type], () => fetchAlbumMusic({ type: props.type, count: 20 }));
    return (
        <React.Fragment>
            <MusicList
                list={data}
                type={"music"}
            />
        </React.Fragment>
    );
}

export default AlbumMusicList;