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
            deleteButton: string;
            submit: string;

            NicknameAlertModal: {
                title: string;
                content: string;
                button: string;
            },

            EmailAlertModal: {
                title: string;
                content: string;
                button: string;
            }
        },
        img: {
            button: string;
        }
    }
}

export default MyPageType;