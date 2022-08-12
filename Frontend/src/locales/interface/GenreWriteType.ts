interface GenreWriteType {
    title: string;
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
}

export default GenreWriteType;