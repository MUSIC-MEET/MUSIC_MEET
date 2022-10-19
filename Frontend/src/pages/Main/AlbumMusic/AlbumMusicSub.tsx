import React, { useCallback, useState } from "react";

function AlbumMusicSub(props: { onChange: (type: "latest" | "popular") => void }) {

    return (
        <div>최신 | 인기</div>
    );
}

export default AlbumMusicSub;