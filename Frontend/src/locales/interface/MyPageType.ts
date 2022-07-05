interface MyPageType {
    title: string;
    edit: {
        values: {
            label: {
                id: string;
                nickname: string;
                email: string;
            },
            placeholder: {
                id: string;
                nickname: string;
                email: string;
            }
            changePasswordButton: string;
            submit: string;
        },
        img: {
            button: string;
        }
    }
}

export default MyPageType;