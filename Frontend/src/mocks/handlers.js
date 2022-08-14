import { rest } from "msw";
import { liveChart } from "./livechart";
import { genreBoard } from "./genreBoard";
export const handlers = [
    liveChart,
    genreBoard
];