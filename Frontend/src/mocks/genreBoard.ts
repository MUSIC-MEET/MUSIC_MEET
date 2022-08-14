import { rest } from "msw";

export const genreBoard =  
    rest.post(`http://localhost:8080/genreboard`, async (req, res, ctx) => {
        const { genre, title, content } = await req.json();    
        if( title.length === 0 || content === 0) {
            return res(
                ctx.status(400),
            );
        }
        if(genre !== null && title !== null && content !== null) {
            return res(
                ctx.status(200),
            );
        } 
    });


