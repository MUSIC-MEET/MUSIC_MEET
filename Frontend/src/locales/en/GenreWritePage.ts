import GenreWriteType from "locales/interface/GenreWriteType";

const text: GenreWriteType = {
    title: "Write Post",
    update: "Edit Post",
    input: {
        titleLabel: "Title",
        titlePlaceholder: "Enter title",

        contentLabel: "Content",
        contentPlaceholder: "Enter content",
    },
    button: {
        submit: "Write",
        cancel: "Cancel"
    },
    backup: {
        title: "Backup exists",
        content: "There is a backup. Do you want to apply it?",
        confirm: "Apply backup",
        cancel: "Delete backup"
    },
    error: {
        title: {
            title: "Title error",
            content: "Title must be 1-20 characters.",
            button: "Confirm"
        },
        content: {
            title:  "Content error",
            content: "Content must be 1-1000 characters.",
            button: "Confirm"
        }
    }
};

export default text;