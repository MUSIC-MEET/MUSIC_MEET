type CoverType = {
    id?: number | string;
    title?: string;
    user?: string;
    description?: string;
    mp3File?: Blob;
    mp3Src?: string;
    fileName?: string;
    imgSrc?: string;
    isVote?: boolean;
    createdAt?: string;
    voteCount?: string;
}

export default CoverType;