import DeleteAccountPageTypes from "locales/interface/DeleteAccountPage";

const text: DeleteAccountPageTypes = {
    title: "Delete Account",
    label: "Password",
    placeholder: "Enter your password",
    submit: "Delete Account",
    error: "Password is incorrect",
    modal: {
        title: "Success",
        content: "Your account has been deleted.",
        button: "OK"
    },
    checkModal: {
        title: "Warning",
        content: "Are you sure you want to delete your account? \\\n Deleted accounts cannot be recovered.",
        confirm: "Delete",
        cancel: "Cancel"
    }
};

export default text;