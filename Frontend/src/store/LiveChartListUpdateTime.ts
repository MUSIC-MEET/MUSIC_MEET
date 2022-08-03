import { atom } from "recoil";

const LiveChartUpdateTime = atom<string>({
    key: "LiveChartUpdateTime",
    default: "2020. 01. 01 12:00:00"
});

export default LiveChartUpdateTime;