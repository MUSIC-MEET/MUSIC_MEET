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
    vote: {
        notLogin: {
            title: "경고",
            content: "로그인이 필요한 기능입니다.",
            button: "확인",
        }
    }
};

export default text;