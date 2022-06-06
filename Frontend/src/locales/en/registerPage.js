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
            invalid: "Invalid id"
        },
        nickname: {
            duplicate: "This nickname is duplicated",
            invalid: "Invalid nickname"
        }, 
        pw: {
            invalid: "Invalid password",
            valid: "Valid password",
            notMatchs: "Not matchs pw1, pw2"
        },
        email: {
            invalid: "Invalid email"
        }
    }
};