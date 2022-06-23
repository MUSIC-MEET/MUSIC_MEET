export default {
    title: "REGISTER",
    placeholder: {
        id: "Only english, number 5~20",
        pw1: "Must include special symbol 8~16",
        pw2: "Enter password again",
        email: "Enter email",
        nickname: "Enter Nickname"
    },
    id: "ID",
    password: "Password",
    nickname: "Nickname",
    email: "E-mail",
    submit: "SignUp",
    errors: {
        id: {
            duplicate: "This id is duplicated",
            invalid: "Disabled id",
            valid: "Available Id"
        },
        nickname: {
            duplicate: "This nickname is duplicated",
            invalid: "Disabled Nickname",
            valid: "Available Nickname"
        }, 
        pw: {
            invalid: "Disabled Password",
            valid: "Available Password",
            notMatchs: "Not matchs pw1, pw2"
        },
        email: {
            invalid: "Disabled Email",
            valid: "Available Email"
        }
    },
    success: {
        ment: "Click the link in the email to complete the sign up.",
        go: "Go to MainPage"
    }
};