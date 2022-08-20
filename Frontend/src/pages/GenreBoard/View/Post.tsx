import { css } from "@emotion/react";
import React, { useContext } from "react";
import Text from "components/common/Text";
import styled from "@emotion/styled";
import ThemeContext from "store/ThemeContext";

import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useQuery } from "react-query";
import GenreBoardViewerContext from "store/GenreBoardViewerContext";
import getPost from "../../../utils/RequestApis/GenreBoard/getPost";

function Post() {
    const ctx = useContext(ThemeContext);
    const { fontColor } = ctx.themeStyle.menu;
    const { genre, num } = useContext(GenreBoardViewerContext);
    const { data, isError, isSuccess } = useQuery(["genreBoardPost", genre, num], () => getPost({ genre, num }), {
        retry: 0,
        suspense: false,
    });


    if (isSuccess) {
        return (
            <article css={postStyle}>
                <h1 className="post-title">제목</h1>
                <AdditionalInfo className="post-info" fontColor={fontColor}>
                    <div className="post-writer-info">
                        <img className="profile-img" src="www.naver.com" />
                        <span className="post-writer">난아무개에요</span>
                    </div>
                    <div className="post-info">
                        <div className="post-date wrapper">
                            <QueryBuilderIcon className="post-date-icon icon" />
                            <span className="post-date-text text">2020.01.01</span>
                        </div>
                        <div className="post-hit wrapper">
                            <VisibilityIcon className="post-hit-icon icon" />
                            <span className="post-hit text">3</span>
                        </div>
                        <div className="post-vote wrapper">
                            <ThumbUpAltIcon className="post-vote-icon icon" />
                            <span className="post-vote text">10</span>
                        </div>
                    </div>
                </AdditionalInfo>
                <Text className="post-content">
                    {"내용 \\\n aaa"}
                </Text>
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

`;

export default React.memo(Post);