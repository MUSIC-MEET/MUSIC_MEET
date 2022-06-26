interface ResetPasswordType {
    title: string;
    form: {
        password: {
            label: string;
            placeholder: string
        },
        rePassword: {
            label: string;
            placeholder: string
        },
        submit: string;
        
    }
    sucess: string;
    go: string;
}

export default ResetPasswordType;