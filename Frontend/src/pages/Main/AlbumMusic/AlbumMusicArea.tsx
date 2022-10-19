import React, { useCallback, useState } from "react";
import MainWrapper from "../MainWrapper";
import AlbumMusic from "./AlbumMusic";
import AlbumMusicSub from "./AlbumMusicSub";

function AlbumMusicArea() {
    const [type, setType] = useState<"latest" | "popular">("latest");
    const typeChangeHandler = useCallback((type: "latest" | "popular") => {
        setType((prev) => type);
    }, []);
    return (
        <React.Fragment>
            <MainWrapper
                title="음악"
                subMenu={<AlbumMusicSub onChange={typeChangeHandler} />}
            >
                <AlbumMusic />
            </MainWrapper>
        </React.Fragment>
    );
}

export default AlbumMusicArea;