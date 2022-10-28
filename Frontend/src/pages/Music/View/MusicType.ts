/**
 * 음악 페이지 음악 타입
 */
interface MusicType {
    imgSrc: string;
    title: string;
    singer: string;
    releaseDate: string;
    lyrics: string;
    voteCount: string;
    isVote: boolean;
    genre: string;
    mp3Src: string;
}

export default MusicType;