interface MusicPlayer {
    content: {
        menus: {
            playList: string;
            lyrics: string;
        }
    }
    controller: {
        emptyMusic: string;
    }
}

export default MusicPlayer;