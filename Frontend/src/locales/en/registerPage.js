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
            notMatchs: "Not matchs two Password"
        },
        email: {
            invalid: "Disabled Email",
            valid: "Available Email",
            duplicate: "This email is duplicated"
        }
    },
    success: {
        title: "Verification required",
        ment: "Click the link in the email to complete the sign up.",
        go: "Go to MainPage"
    },
    emailauth: {
        success: {
            title: "Success",
            description: "Authentication is completed.",
            go: "Go to Login"
        },
        fail: {
            title: "Fail",
            description: "Already authenticated or wrong authentication."
        }
    }
};