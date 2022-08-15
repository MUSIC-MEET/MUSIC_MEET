import { rest } from "msw";

export const genreBoardImage =  
    rest.post(`http://localhost:8080/genreboard/image`, async (req, res, ctx) => {
           
        return res(
            ctx.status(200),
            ctx.json({
                imgSrc: "https://www.google.com/logos/doodles/2022/national-liberation-day-of-korea-2022-6753651837109632.2-s.png"
            })
        );
    });


