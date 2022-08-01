import { rest } from "msw";



interface song {
    rank: number;
    title: string;
    singer : string;
    img_src: string;
}
export const liveChart =  
    rest.get(`http://localhost:8080/livechart/:service/:rank`, (req, res, ctx) => {
        const { service, rank } = req.params;
        let songs: song[]  = [];
        if(service === "melon") {
            songs = [
                {
                    rank: 1, 
                    title: "1번노래",
                    singer: "아이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 2, 
                    title: "2번노래",
                    singer: "2이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 3, 
                    title: "3번노래",
                    singer: "3이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 4, 
                    title: "4번노래",
                    singer: "4이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 5, 
                    title: "1번노래",
                    singer: "5이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 6, 
                    title: "1번노래",
                    singer: "6이유",
                    img_src: "https://test.com/1.png"
                },
                
            ];
        }

        if(service === "genie") {
            songs = [
                {
                    rank: 1, 
                    title: "genie 1번노래",
                    singer: "아이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 2, 
                    title: "genie 2번노래",
                    singer: "2이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 3, 
                    title: "genie 3번노래",
                    singer: "3이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 4, 
                    title: "genie 4번노래",
                    singer: "4이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 5, 
                    title: "genie 1번노래",
                    singer: "5이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 6, 
                    title: "1번노래",
                    singer: "6이유",
                    img_src: "https://test.com/1.png"
                },
                
            ];
        }

        if(service === "spotify") {
            songs = [
                {
                    rank: 1, 
                    title: "spotify 1번노래",
                    singer: "아이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 2, 
                    title: "spotify 2번노래",
                    singer: "2이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 3, 
                    title: "spotify 3번노래",
                    singer: "3이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 4, 
                    title: "spotify 4번노래",
                    singer: "4이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 5, 
                    title: "spotify 1번노래",
                    singer: "5이유",
                    img_src: "https://test.com/1.png"
                },
                {
                    rank: 6, 
                    title: "1번노래",
                    singer: "6이유",
                    img_src: "https://test.com/1.png"
                },
                
            ];
        }
        return res(
            ctx.status(200),
            ctx.json({
                songs
            })
        );
    });

