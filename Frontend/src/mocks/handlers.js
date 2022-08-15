import { rest } from "msw";
import { liveChart } from "./livechart";
import { genreBoard } from "./genreBoard";
import { genreBoardImage } from "./genreBoardImage";
export const handlers = [
    liveChart,
    genreBoard,
    genreBoardImage,
];