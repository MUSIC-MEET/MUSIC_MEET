import ResetPasswordType from "locales/interface/ResetPasswordType";

const text: ResetPasswordType = {
    title: "비밀번호 재설정",
    form: {
        password: {
            label: "새로운 비밀번호",
            placeholder: "새로운 비밀번호를 입력해주세요."
        },
        rePassword: {
            label: "비밀번호 재입력",
            placeholder: "새로운 비밀번호를 한번더 입력해주세요."
        },
        submit: "비밀번호 변경하기"
    },
    sucess: "비밀번호 변경이 완료되었습니다.",
    error: "비밀번호 변경에 실패하였습니다.",
    go: "로그인 하러 가기",
    keyError: "유효하지 않는 접근입니다."
};

export default text;