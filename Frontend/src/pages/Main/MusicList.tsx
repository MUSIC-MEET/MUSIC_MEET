import { css } from "@emotion/react";
import MusicItem from "components/common/MusicItem";
import React, { useCallback, useMemo, useState } from "react";
import MusicType from "./MusicType";

interface MusicListProps {
    list?: MusicType[]
    type: string;
}

function MusicList(props: MusicListProps) {
    const MUSIC_LENGTH = useMemo(() => props.list?.length ?? 0, [props.list]);
    const PAGE = useMemo(() => {
        return Math.floor(MUSIC_LENGTH) % 5 === 0 ? MUSIC_LENGTH / 5 : Math.floor(MUSIC_LENGTH / 5) + 1;
    }, [MUSIC_LENGTH]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [transValue, setTrans] = useState<number>(0);
    const nextHandler = useCallback(() => {
        if (currentPage === PAGE) return;
        setTrans((prev) => prev - 100);
        setCurrentPage((prev) => prev + 1);
    }, [PAGE, currentPage]);
    const prevHandler = useCallback(() => {
        if (currentPage === 1) return;
        setTrans((prev) => prev + 100);
        setCurrentPage((prev) => prev - 1);
    }, [currentPage]);
    return (
        <div css={wrapper}>
            <div css={controlBtnWrapperStyle} className="control-btns">
                <button onClick={prevHandler} className="prev-btn">{"<"}</button>
                <button onClick={nextHandler} className="next-btn">{">"}</button>
            </div>
            <ul
                style={{ transform: `translateX(${transValue}%)` }}
                css={[container, css`transform: translateX(-${transValue}%);`]}
            >
                {
                    props.list?.map((item) => (
                        <MusicItem
                            key={item.id}
                            type={props.type}
                            className="item"
                            {...item}
                        />
                    ))
                }
            </ul>
        </div>


    );
}

const wrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const container = css`
    display: flex;
    scrollbar-width:none;
    transition: all 0.5s;
    min-width: 100%;
    li {
        padding: 0 0.5rem;
        position: relative;
        min-width: 20%;
        width: 20%;
        height: 10rem;
        overflow-y: hidden;
    }
    scrollbar-width: 0;
`;

const controlBtnWrapperStyle = css`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;

    padding: 1rem;
    & > button {
        all: unset;
        cursor: pointer;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        padding: 0.5rem;
        font-weight: 700;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        z-index: 66;
    }
`;

export default MusicList;