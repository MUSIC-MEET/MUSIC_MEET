import GenreWriteType from "locales/interface/GenreWriteType";

const text: GenreWriteType = {
    title: "글 쓰기",
    update: "글 수정",
    input: {
        titleLabel: "제목",
        titlePlaceholder: "제목을 입력하세요.",

        contentLabel: "내용",
        contentPlaceholder: "내용을 입력하세요",
    },
    button: {
        submit: "작성",
        cancel: "취소"
    },
    backup: {
        title: "백업 존재",
        content: "작성하던글이 존재합니다. 적용 하시겠습니까?",
        confirm: "백업 적용",
        cancel: "백업 삭제"
    }, 
    error: {
        title: {
            title: "제목 에러",
            content: "제목은 1~20자 이내로 작성해주세요.",
            button: "확인"
        },
        content: {
            title:  "내용 에러",
            content: "내용은 1~1000자 이내로 작성해주세요.",
            button: "확인"
        }
    }
};

export default text;