import { css } from "@emotion/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import getChartList from "utils/RequestApis/LiveChart/getChartList";
import { AxiosResponse } from "axios";
import Song from "./Song";
import Loading from "components/common/Loading";
import { useSetRecoilState } from "recoil";
import LiveChartUpdateTime from "../../store/LiveChartListUpdateTime";

interface ChartListProps {
    service: string;
    rank: string;

}

interface SongType {
    rank: number;
    title: string;
    singer: string;
    imgSrc: string;
}

function ChartList({ service, rank }: ChartListProps) {
    const [songList, setSongList] = useState<SongType[]>([]);
    const setUpdateTime = useSetRecoilState(LiveChartUpdateTime);
    const { isLoading } = useQuery(["getLiveList", [service, rank]], () => getChartList({ service, rank }), {
        suspense: false,
        useErrorBoundary: false,
        retry: 3,
        refetchOnWindowFocus: false,
        onSuccess: (response: AxiosResponse) => {
            setSongList(response.data.songs);
            setUpdateTime(response.data.updateTime);
        }
    });

    if (isLoading) {
        return <div css={listStyle}><Loading /></div>;
    }
    return (
        <table css={listStyle}>
            <tbody>
                {songList.map((song) => (
                    <Song
                        key={song.rank}
                        rank={song.rank}
                        title={song.title}
                        singer={song.singer}
                        imgSrc={song.imgSrc}
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

export default React.memo(ChartList);
export { SongType };