
import MyPageType from "locales/interface/MyPageType";
const text: MyPageType = {
    title: "MyPage",
    edit: {
        values: {
            label: {
                id: "ID",
                nickname: "Nickname",
                email: "Email"
            },
            placeholder: {
                id: "Enter Change ID",
                nickname: "Enter Change Nickname",
                email: "Enter Change Email"
            },
            changePasswordButton: "Change Password",
            deleteButton: "Delete Account",
            submit: "Edit",

            NicknameAlertModal: {
                title: "Change Success",
                content: "Nickname Change Success.  \nPlease Login Again",
                button: "OK"
            },

            EmailAlertModal: {
                title: "Change Success",
                content: "Email Change Success.  \nPlease Check your Email and after Login Again",
                button: "OK"
            },

        },
        img: {
            button: "Select Change Image"
        }
    },
    evaluation: {
        title: "Latest Evaluation Music"
    }
};

export default text;