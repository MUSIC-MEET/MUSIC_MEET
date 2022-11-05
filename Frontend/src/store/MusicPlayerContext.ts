import React from "react";


interface MusicPlayerContextProps {
    isShownContent: boolean;
    onChangeShownContentState: () => void;
    currentImage?: string;
    currentLyrics?: string;
}

const MusicPlayerContenxt = React.createContext<MusicPlayerContextProps>({
    isShownContent: false,
    onChangeShownContentState: () => { 
        // 
    },
    currentImage: "",
    currentLyrics: "",
});

export default MusicPlayerContenxt;