interface DeleteAccountPageTypes {
    title: string;
    label: string;
    placeholder: string;
    submit: string;
    error: string;
    
    modal: {
        title: string;
        content: string;
        button: string;
    }

    checkModal: {
        title: string;
        content: string;
        confirm: string;
        cancel: string;
    }
}
export default DeleteAccountPageTypes;