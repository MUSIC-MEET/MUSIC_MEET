import MusicPage from "locales/interface/MusicPage";

const text: MusicPage = {
    title: "곡 정보",
    musicInfo: {
        releaseDate: "발매일",
        genre: "장르",
        lyrics: "가사",
        showLyrics: "가사 보기"
    },
    comments: {
        input: {
            placeholder: "댓글을 입력하세요",
            submit: "등록"
        }
    },
    error: {
        notFound: "삭제된 음악이거나 존재하지 않는 음악입니다"
    },
    deleteAlertModal: {
        title: "에러",
        content: "이 음악은 삭제되었습니다.",
        confirm: "확인"
    },
};

export default text;