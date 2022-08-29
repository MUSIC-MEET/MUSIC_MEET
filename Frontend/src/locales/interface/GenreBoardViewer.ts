interface GenreBoardViewerType {
    error: {
        notFound: string;
    },

    deleteModal: {
        title: string;
        content: string;
        confirm: string;
        cancel: string;
    }

    vote: {
        notLogin: {
            title: string;
            content: string;
            button: string;
        }
    }
}

export default GenreBoardViewerType;