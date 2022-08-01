import { css } from "@emotion/react";
import React from "react";
import { SongType } from "./ChartList";
function Song({ rank, title, singer, img_src }: SongType) {
    return (
        <tr>
            <td>{rank}</td>
            <td>{title}</td>
            <td>{singer}</td>
        </tr>
    );
}


export default Song;