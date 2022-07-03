interface MyPageType {
    title: string;
    edit: {
        values: {
            label: {
                id: string;
                nickname: string;
                email: string;
            }
            changePasswordButton: string;
            submit: string;
        }
    }
}

export default MyPageType;