interface CoverViewPage {
    createdAt: string;
    notFound: string;
    title: string;
    comment: {
        input: {
            placeholder: string;
            submit: string;
        }
    }

    deleteModal: {
        title: string;
        content: string;
        cancel: string;
        confirm: string;
    }
}

export default CoverViewPage;