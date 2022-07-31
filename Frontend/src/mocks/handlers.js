import { rest } from "msw";

export const handlers = [
    rest.get(`http://localhost:8080/auth/pw/:key`, (req, res, ctx) => {
        const { key } = req.params;
        console.log(key);
        if(key==="123") {
            return res(
                // Respond with a 200 status code
                ctx.status(200),
            );
        }
        else {
            return res(
                ctx.status(400),
            );
        }
    }),
];