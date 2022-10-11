type CoverType = {
    id?: number;
    title?: string;
    user?: string;
    description?: string;
    mp3File?: Blob;
    mp3Src?: string;
    imgSrc?: string;
    isVote?: boolean;
    createdAt?: string;
    voteCount?: string;
}

export default CoverType;