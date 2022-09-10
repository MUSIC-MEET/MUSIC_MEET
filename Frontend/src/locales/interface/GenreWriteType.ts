interface GenreWriteType {
    title: string;
    update: string;
    input: {
        titleLabel: string;
        titlePlaceholder: string;

        contentLabel: string;
        contentPlaceholder: string;
    }
    button: {
        submit: string;
        cancel: string;
    }
    backup: {
        title: string;
        content: string;
        confirm: string;
        cancel: string;
    }

    error: {
        title: {
            title: string;
            content: string;
            button: string;
        },
        content: {
            title: string;
            content: string;
            button: string;
        }
    }
}

export default GenreWriteType;