interface MainPage {
    more: string;
    title: {
        albumMusic: string;
        coverMusic: string;
        genreBoard: string;
        liveChart: string;
    }

    type: { 
        latest: string;
        popular: string;
    }
}

export default MainPage;