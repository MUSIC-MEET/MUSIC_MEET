import DeleteAccountPageTypes from "locales/interface/DeleteAccountPage";

const text: DeleteAccountPageTypes = {
    title: "회원 탈퇴",
    label: "비밀번호",
    placeholder: "비밀번호를 입력해주세요",
    submit: "탈퇴하기",
    error: "비밀번호가 일치하지 않습니다",
    modal: {
        title: "성공",
        content: "회원 탈퇴가 완료되었습니다.",
        button: "확인"
    },
    checkModal: {
        title: "경고",
        content: "정말로 탈퇴 하시겠습니까? \\\n 탈퇴된 계정은 복구할 수 없습니다.",
        confirm: "탈퇴",
        cancel: "취소"
    }
};

export default text;