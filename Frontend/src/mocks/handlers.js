import { rest } from "msw";
import { liveChart } from "./livechart";
export const handlers = [
    liveChart
];