import React from "react";

const MusicPlayerContenxt = React.createContext({
    isShownContent: false,
    onChangeShownContentState: () => { 
        // 
    },
    currentMusic: ""
});

export default MusicPlayerContenxt;