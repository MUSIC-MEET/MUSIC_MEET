import React from "react";
import  PlayListMusicType  from "Types/PlayListMusicType";

interface MusicPlayerContextProps {
    isShownContent: boolean;
    onChangeShownContentState: () => void;
    currentImage?: string;
    currentLyrics?: string;
    currentMusicName?: string;
    currentMusicArtist?: string;
    playList?: PlayListMusicType[];
    currentMusicIndex?: number;
    onChangeCurrentMusicIndex: (index: number) => void;
}

const MusicPlayerContenxt = React.createContext<MusicPlayerContextProps>({
    isShownContent: false,
    onChangeShownContentState: () => { 
        // 
    },
    currentImage: "",
    currentLyrics: "",
    currentMusicName: "",
    currentMusicArtist: "",
    playList: [],
    currentMusicIndex: 0,
    onChangeCurrentMusicIndex: () => {
        //
    }
});

export default MusicPlayerContenxt;