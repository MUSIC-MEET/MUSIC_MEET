interface MusicPage {
    title: string;
    musicInfo: {
        releaseDate: string;
        genre: string;
        lyrics: string;
        showLyrics: string;
    }
    comments: {
        input: {
            placeholder: string;
            submit: string;
        }
    }

    error: {
        notFound: string;
    }
}

export default MusicPage;