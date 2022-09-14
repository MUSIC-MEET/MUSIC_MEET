import GenreBoardViewerType from "locales/interface/GenreBoardViewer";

const text: GenreBoardViewerType = {
    error: {
        notFound: "Already deleted or not exist post."
    },
    deleteModal: {
        title: "Delete",
        content: "Are you sure you want to delete this post?",
        confirm: "Delete",
        cancel: "Cancel"
    },
    deleteAlertModal: {
        title: "Error",
        content: "This post has been deleted.",
        confirm: "Confirm"
    },
    vote: {
        notLogin: {
            title: "Warning",
            content: "This service is required login.",
            button: "OK"
        }
    },
    comment: {
        input: {
            placeholder: {
                login: "Enter your comment",
                notLogin: "This service is required login."
            },
            submit: "Submit"
        },

        edit: {
            submit: "Edit"
        }
    },


};

export default text;