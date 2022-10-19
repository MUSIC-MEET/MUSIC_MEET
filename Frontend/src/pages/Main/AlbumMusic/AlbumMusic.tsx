import React, { useCallback, useState } from "react";
import MusicList from "../MusicList";

function AlbumMusicList() {

    const dump = [
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },
        { imgSrc: "https://i.ytimg.com/vi/1Q8fG0TtVAY/maxresdefault.jpg", title: "test", artist: "test", musicNum: "1" },


    ];
    return (
        <React.Fragment>
            <MusicList
                list={dump}
                itemWidth={"8rem"}
                itemHeight={"8rem"}
            />
        </React.Fragment>
    );
}

export default AlbumMusicList;