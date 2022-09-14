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

    deleteAlertModal: {
        title: string;
        content: string;
        confirm: string;
    }

    vote: {
        notLogin: {
            title: string;
            content: string;
            button: string;
        }
    }

    comment: {
        input: {
            placeholder: {
                login: string;
                notLogin: string;
            }
            submit: string;
        }
        edit: {
            submit: string;
        }
    }
}

export default GenreBoardViewerType;