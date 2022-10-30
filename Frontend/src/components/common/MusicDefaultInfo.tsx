import Player from "pages/Cover/View/Player";
import React from "react";
import Img from "./Img";
import MusicTextInfo from "./MusicTextInfo";
import SectionWrapper from "./SectionWrapper";
import MusicType from "Types/MusicType";
import { css } from "@emotion/react";


interface MusicDefaultInfoProps {
    voteHandler?: () => void;
    deleteHandler?: () => void;
}


/**
 *  음악 기본 정보 컴포넌트
 * @param props.voteHandler 투표 핸들러
 * @param props.deleteHandler 삭제 핸들러
 * @returns 
 */
function MusicDefaultInfo(props: MusicType & MusicDefaultInfoProps) {
    return (
        <SectionWrapper css={infoStyle}>
            <Img imgSrc={props?.imgSrc} />
            <MusicTextInfo
                {...props}
                voteHandler={props.voteHandler}
                deleteHandler={props.deleteHandler}
            />
            <Player
                mp3Src={props?.mp3Src}
            />
        </SectionWrapper>
    );
}

const infoStyle = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    figure{
        width: 10rem;
        height: 10rem;
        border: 1px solid black;
    }

    .player {
        margin-left: auto;
        margin-right: 3rem;
        justify-content: flex-end;
        margin-top: 1rem;
        transform: scale(2);

        svg {
            margin-left: 0.4rem;
            cursor: pointer;
        }
    }
`;

export default MusicDefaultInfo;