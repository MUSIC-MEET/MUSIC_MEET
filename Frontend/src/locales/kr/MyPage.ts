import MyPageType from "locales/interface/MyPageType";

const text: MyPageType = {
    title: "내 정보",
    edit: {
        values: {
            label: {
                id: "아이디",
                nickname: "닉네임",
                email: "이메일"
            },
            placeholder: {
                id: "변경할 아이디를 입력해주세요",
                nickname: "변경할 닉네임을 입력해주세요",
                email: "변경할 이메일을 입력해주세요"
            },
            changePasswordButton: "비밀번호 변경",
            deleteButton: "회원 탈퇴",
            submit: "변경",

            NicknameAlertModal: {
                title: "변경 성공",
                content: "닉네임 변경에 성공하였습니다.  \n다시 로그인해주세요.",
                button: "확인"
            },

            EmailAlertModal: {
                title: "변경 성공",
                content: "이메일 변경에 성공하였습니다.  \n이메일을 확인 해주신 후 다시 로그인해주세요.",
                button: "확인"
            }
        },
        img: {
            button: "변경할 이미지를 선택해주세요."
        }
    },
    evaluation: {
        title: "최근 평가한 음악"
    }
};

export default text;