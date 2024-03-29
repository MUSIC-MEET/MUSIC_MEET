interface GenreBoardType {
    title: string;
    genre: {
        balad: string;
        rnb: string;
        hiphop: string;
        trort: string;
        kpop: string;
        jpop: string;
        pop: string;
        classic: string;
        dance: string;
        mr: string;
        jazz: string;
        ost: string;
    }
    list: {
        head: {
            num: string;
            title: string;
            time: string;
            writer: string;
            view: string;
            vote: string;
        }
    }
}

export default GenreBoardType;