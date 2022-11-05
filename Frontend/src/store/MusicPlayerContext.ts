import React from "react";


interface MusicPlayerContextProps {
    isShownContent: boolean;
    onChangeShownContentState: () => void;
    currentImage?: string;
    currentLyrics?: string;
    currentMusicName?: string;
    currentMusicArtist?: string;
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
});

export default MusicPlayerContenxt;