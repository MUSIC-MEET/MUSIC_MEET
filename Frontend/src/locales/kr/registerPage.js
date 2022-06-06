export default {
    title: "회원가입",
    placeholder: {
        id: "영문, 숫자 5~20",
        pw1: "영문, 숫자, 특수기호를 포함해 8~16",
        pw2: "비밀번호를 다시 입력해주세요.",
        email: "이메일을 입력해주세요",
        nickname: "닉네임을 입력해주세요"
    },
    id: "아이디",
    password: "비밀번호",
    email: "이메일",
    nickname: "닉네임",
    submit: "가입하기",
    errors: {
        id: {
            duplicate: "사용중인 아이디",
            invalid: "유효하지 않는 아이디"
        },
        nickname: {
            duplicate: "사용중인 닉네임",
            invalid: "유효하지 않는 닉네임"
        },
        pw: {
            invalid: "유효하지않는 비밀번호",
            valid: "유효한 비밀번호",
            notMatchs: "일치하지 않는 비밀번호"
        }, 
        email: {
            invalid: "유효하지않는 이메일"
        }
    }
};