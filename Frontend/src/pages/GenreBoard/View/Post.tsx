import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import ThemeContext from "store/ThemeContext";

import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useQuery } from "react-query";
import getPost from "../../../utils/RequestApis/GenreBoard/getPost";
import { useParams } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import { AxiosError } from "axios";
import Vote from "./Vote";
import MoreActions from "./MoreActions";
import { PostContentType } from "./PostContentType";

function Post() {
    const ctx = useContext(ThemeContext);
    const { fontColor } = ctx.themeStyle.menu;
    const { fontColor: viewerFontColor } = ctx.themeStyle.content;
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "0";

    const { data } = useQuery<PostContentType, AxiosError>(["genreBoardPost", num], () => getPost({ genre, num }), {
        suspense: true,
        useErrorBoundary: true,
    });


    const vote = data!.upvote + (-data!.downvote);
    return (
        <Article fontColor={viewerFontColor}>
            <h1 className="post-title">{data?.title}</h1>
            <AdditionalInfo className="post-info" fontColor={fontColor}>
                <div className="post-writer-info">
                    <img className="profile-img" src={data?.imgSrc} />
                    <span className="post-writer">{data?.user}</span>
                </div>
                <div className="post-info">
                    <div className="post-date wrapper">
                        <QueryBuilderIcon className="post-date-icon icon" />
                        <span className="post-date-text text">{data?.createdAt}</span>
                    </div>
                    <div className="post-hit wrapper">
                        <VisibilityIcon className="post-hit-icon icon" />
                        <span className="post-hit text">{data?.view}</span>
                    </div>
                    <div className="post-vote wrapper">
                        <ThumbUpAltIcon className="post-vote-icon icon" />
                        <span className="post-vote text">{vote}</span>
                    </div>
                </div>
            </AdditionalInfo>

            <Viewer
                initialValue={data?.content}
            />
            <Vote
                upvote={data?.upvote}
                downvote={data?.downvote}
            />
            <MoreActions
                writer={data!.user}
                genre={genre}
                num={num}
            />

        </Article >
    );

}

const Article = styled.article<{ fontColor: string }>`
    width:100%;
    margin-top: 3rem;
    margin-bottom: 2rem;
    & > .post-title {
        font-size: 2rem;
        font-weight: 400;
    }
    & > .post-content {
        margin-top: 1rem;
        min-height: 20rem;
        
    }
    .toastui-editor-contents p,
    .toastui-editor-contents h1,
    .toastui-editor-contents h2,
    .toastui-editor-contents h3,
    .toastui-editor-contents h4,
    .toastui-editor-contents h5,
    .toastui-editor-contents h6 {
        margin: 0px !important;
        color: ${props => props.fontColor};
    }
`;

const AdditionalInfo = styled.div<{ fontColor: string }>`
        width: 100%;
        height: 2.5rem;
        color : ${props => props.fontColor};
        margin-top: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    
        & > .post-writer-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
    
            .profile-img {
                border: 1px solid gray;
                border-radius: 50%;
                width: 2rem;
                height: 2rem;
                object-fit: fill;
            }
    
            .post-writer {
                margin-left: 0.5rem;
            }
        }
    
        & > .post-info {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
    
            .text {
                margin-left: 0.2rem;
                margin-right: 0.5rem;
            }
    
            .wrapper {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
            }
        }
    
`;


export default Post;
