import { css } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import Text from "components/common/Text";
import styled from "@emotion/styled";
import ThemeContext from "store/ThemeContext";

import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useQuery } from "react-query";
import GenreBoardViewerContext from "store/GenreBoardViewerContext";
import getPost from "../../../utils/RequestApis/GenreBoard/getPost";
import { useParams } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";


interface PostType {
    title: string;
    content: string;
    nickname: string;
    createdAt: string;
    imgSrc: string;
    view: number;
    vote: number;
}

function Post() {
    const ctx = useContext(ThemeContext);
    const { fontColor } = ctx.themeStyle.menu;
    const params = useParams();
    const genre = params.genre ?? "kpop";
    const num = params.num ?? "0";

    const [post, setPost] = useState<PostType>({
        title: "",
        content: "",
        nickname: "",
        createdAt: "",
        imgSrc: "",
        view: 0,
        vote: 0,
    });

    useEffect(() => {
        //
    }, [genre, num]);

    const { isError, isSuccess } = useQuery(["genreBoardPost", genre, num], () => getPost({ genre, num }), {
        retry: 0,
        suspense: false,
        onSuccess: ({ data }) => {
            setPost(data);
        }
    });

    if (isSuccess) {
        return (
            <article css={postStyle}>
                <h1 className="post-title">{post.title}</h1>
                <AdditionalInfo className="post-info" fontColor={fontColor}>
                    <div className="post-writer-info">
                        <img className="profile-img" src={post.imgSrc} />
                        <span className="post-writer">{post.nickname}</span>
                    </div>
                    <div className="post-info">
                        <div className="post-date wrapper">
                            <QueryBuilderIcon className="post-date-icon icon" />
                            <span className="post-date-text text">{post.createdAt}</span>
                        </div>
                        <div className="post-hit wrapper">
                            <VisibilityIcon className="post-hit-icon icon" />
                            <span className="post-hit text">{post.view}</span>
                        </div>
                        <div className="post-vote wrapper">
                            <ThumbUpAltIcon className="post-vote-icon icon" />
                            <span className="post-vote text">{post.vote}</span>
                        </div>
                    </div>
                </AdditionalInfo>
                <Viewer
                    initialValue={post.content}
                />
            </article >
        );
    }

    return (
        <div>
            aa
        </div>
    );
}

const AdditionalInfo = React.memo(styled.div<{ fontColor: string }>`
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
    
`);

const postStyle = css`
    width: 80rem;
    margin-top: 3rem;
    & > .post-title {
        font-size: 2rem;
        font-weight: 400;
    }

    & > .post-content {
        margin-top: 1rem;
        min-height: 20rem;
        
    }

    .toastui-editor-contents > * {
        color: white;
    }

`;

export default React.memo(Post);