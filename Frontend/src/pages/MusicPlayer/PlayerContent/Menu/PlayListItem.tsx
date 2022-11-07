import styled from "@emotion/styled";
import React, { useCallback, useContext, useState } from "react";
import PlayListItemType from "Types/PlayListItemType";
import ThemeContext from "store/ThemeContext";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MusicPlayerContenxt from "store/MusicPlayerContext";
import deleteMusic from "utils/RequestApis/MusicPlayer/deleteMusic";
import { useMutation, useQueryClient } from "react-query";

/**
 * 플레이 리스트 아이템 컴포넌트
 * @param props.isPlaying {boolean} 현재 재생중인지 여부
 * @returns 
 */
function PlayListItem(props: PlayListItemType & { isPlaying: boolean; index: number }) {
    const ctx = useContext(ThemeContext);
    const ctx2 = useContext(MusicPlayerContenxt);
    const [isHover, setIsHover] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { mutate } = useMutation(["deleteMusic"], deleteMusic, {
        onSuccess: () => {
            queryClient.invalidateQueries(["fetchMusicPlayList"]);
        }
    });
    const transTime = useCallback((mlisecond: number) => {
        const minute = Math.floor(mlisecond / 60);
        const second = Math.floor(mlisecond % 60);
        return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
    }, []);

    const onDelete = useCallback(() => {
        mutate(props.index ?? -1);
    }, [mutate, props.index]);

    return (
        <Item
            subFontColor={ctx.themeStyle.fontStyle2.color}
            isPlaying={props.isPlaying}
            isHover={isHover}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => ctx2.onChangeCurrentMusicIndex(props.index)}
        >
            <div className="left">
                <figure>
                    <img src={props.imgSrc} alt="" />
                    {props.isPlaying && <div className="playing effect"><VolumeUpIcon /></div>}
                    {(isHover && !props.isPlaying) && <div className="hover effect"><PlayArrowIcon /></div>}
                </figure>
                <div className="text">
                    <h2 className="title">{props.title}</h2>
                    <h3 className="singer sub">{props.artist}</h3>
                </div>
            </div>
            <div className="right">
                {
                    isHover ?
                        <div className="hover effect"><DeleteForeverIcon onClick={onDelete} /></div> :
                        <h3 className="sub">{`${transTime(props.length ?? 0)}`}</h3>
                }
            </div>
        </Item>
    );
}

interface ItemProps {
    subFontColor: string;
    isPlaying: boolean;
    isHover: boolean;
}

const Item = React.memo(styled.li<ItemProps>`
    
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(88, 88, 88);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: rgba(88, 88, 88, 0.2);    
    }

    background-color: ${(props) => props.isPlaying ? "rgba(88, 88, 88, 0.2)" : "transparent"};
    .sub {
        color: ${props => props.subFontColor};
    }
    & > .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 1rem;
        .effect {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        figure, .effect {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        figure {
            position: relative;
            width: 3rem;
            height: 3rem;
            margin-right: 0.5rem;
        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }
    }

    & > .right {
        margin-right: 1rem;
    }
`);

export default PlayListItem;