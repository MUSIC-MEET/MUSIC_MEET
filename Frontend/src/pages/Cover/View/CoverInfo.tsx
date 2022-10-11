import React, { useCallback } from "react";
import SectionWrapper from "components/common/SectionWrapper";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import Img from "./Img";
import TextInfo from "./TextInfo";
import Player from "./Player";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fetchCover from "utils/RequestApis/Cover/fetchCover";
import Description from "./Description";
import voteCover from "utils/RequestApis/Cover/voteCover";

function CoverInfo() {

    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const { data } = useQuery(["fetchCover", id], () => fetchCover(id ?? "0"));
    console.log("CoverInfo");
    const { mutate } = useMutation(["voteCover"], voteCover, {
        useErrorBoundary: true,
        onSuccess: (response) => {
            if (response.status === 204) {
                queryClient.invalidateQueries(["fetchCover", id]);
            }
        }
    });

    const voteHandler = useCallback(() => {
        mutate(id ?? "0");
    }, [id, mutate]);
    return (
        <React.Fragment>
            <SectionWrapper css={infoStyle}>
                <Img imgSrc={data?.imgSrc} />
                <TextInfo
                    {...data}
                    voteCount={data?.voteCount}
                    vote={voteHandler}
                />
                <Player
                    mp3Src={data?.mp3Src}
                />
            </SectionWrapper>
            <SectionWrapper>
                <Description
                    description={data?.description}
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