import { rest } from "msw";

export const handlers = [

    rest.get(`${process.env.REACT_APP_API_URL}/auth/pw/:key`, (req, res, ctx) => {
        const { key } = req.params;
        console.log(key);
        return res(
            // Respond with a 200 status code
            ctx.status(200),
        );
    }),
];