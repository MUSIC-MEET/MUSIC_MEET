import MusicPage from "locales/interface/MusicPage";

const text: MusicPage = {
    title: "Music Info",
    musicInfo: {
        releaseDate: "Release Date",
        genre: "Genre",
        lyrics: "lyrics",
        showLyrics: "Show lyrics"
    },
    comments: {
        input: {
            placeholder: "Enter your comment",
            submit: "Submit"
        }
    },
    error: {
        notFound: "Already deleted or not exist music"
    },
    deleteAlertModal: {
        title: "Error",
        content: "This music is already deleted",
        confirm: "Confirm"
    },
};

export default text;