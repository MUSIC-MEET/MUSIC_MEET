import React from "react";
import SectionWrapper from "components/common/SectionWrapper";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import Img from "./Img";
import TextInfo from "./TextInfo";
import Lyrics from "./Lyrics";
import Player from "./Player";

function CoverInfo() {
    const { id } = useParams<{ id: string }>();

    return (
        <React.Fragment>
            <SectionWrapper css={infoStyle}>
                <Img />
                <TextInfo
                    title="호빵호빵 호빵맨"
                    user="호빵이"
                    createdAt="2021-08-01"
                />
                <Player />
            </SectionWrapper>
            <SectionWrapper>
                <Lyrics
                    lyrics="호빵\\n호Qkd ghQKd \n ghQKdaos"
                />
            </SectionWrapper>
        </React.Fragment>

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
export default CoverInfo;