import GenreBoardViewerType from "locales/interface/GenreBoardViewer";

const text: GenreBoardViewerType = {
    error: {
        notFound: "이미 삭제된 게시글 이거나 존재하지 않는 게시글 입니다."
    },
    deleteModal: {
        title: "삭제",
        content: "이 게시글을 삭제하시겠습니까?",
        confirm: "삭제",
        cancel: "취소"
    },
    deleteAlertModal: {
        title: "에러",
        content: "이 게시글은 이미 삭제되었습니다.",
        confirm: "확인"
    },
    vote: {
        notLogin: {
            title: "경고",
            content: "로그인이 필요한 기능입니다.",
            button: "확인",
        }
    },
    comment: {
        input: {
            placeholder: {
                login: "댓글을 입력해주세요",
                notLogin: "로그인이 필요한 기능입니다."
            },
            submit: "등록"
        },
        edit: {
            submit: "수정"
        }
    }
};

export default text;