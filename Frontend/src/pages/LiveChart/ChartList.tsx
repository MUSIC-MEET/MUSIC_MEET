import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import getChartList from "utils/RequestApis/LiveChart/getChartList";
import { AxiosResponse } from "axios";
import Song from "./Song";

interface ChartListProps {
    service: string;
    rank: string;
}

interface SongType {
    rank: number;
    title: string;
    singer: string;
    img_src: string;
}

function ChartList({ service, rank }: ChartListProps) {
    const [songList, setSongList] = useState<SongType[]>([]);
    const { data } = useQuery("getLiveList", () => getChartList({ service, rank }), {
        suspense: false,
        useErrorBoundary: false,
        retry: 3,
        refetchOnWindowFocus: false,
        onSuccess: (response: AxiosResponse) => {
            setSongList(response.data.songs);
        }
    });

    useEffect(() => {
        //
        console.log("ChartListRender");
    }, [service, rank, data]);


    return (
        <table css={listStyle}>
            ChartList
            <tbody>
                {songList.map((song) => (
                    <Song
                        key={song.rank}
                        rank={song.rank}
                        title={song.title}
                        singer={song.singer}
                        img_src={song.img_src}
                    />
                ))}
            </tbody>
        </table>
    );
}


const listStyle = css`
    margin-top: 5rem;
    width: 91rem;
`;

export default ChartList;
export { SongType };