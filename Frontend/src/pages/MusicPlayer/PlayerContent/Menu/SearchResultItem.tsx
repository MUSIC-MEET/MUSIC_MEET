import React from "react";
import PlayListSearchItem from "Types/PlayListSearchItem";
import BaseProps from "components/common/BaseProps";
import { css } from "@emotion/react";

import AddIcon from "@mui/icons-material/Add";

interface SearchResultItemProps {
    onAdd: (id: number) => void;
}

function SearchResultItem(props: BaseProps & PlayListSearchItem & SearchResultItemProps) {
    return (
        <li
            css={style}
            className={`${props?.className}`}
        >
            <div className="left">
                <figure>
                    <img src={props?.imgSrc} alt="" />
                </figure>
                <div className="info">
                    <h2 className="title">{props?.title}</h2>
                    <h3 className="sub artist">{props?.artist}</h3>
                </div>
            </div>
            <div className="right">
                <AddIcon onClick={() => props.onAdd(props.id ?? -1)} />
            </div>
        </li>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 0.5rem;

    &:hover {
        background-color: rgba(88, 88, 88, 0.2);
    }

    & > .left { 
        display: flex;
        flex-direction: row;
        figure {
            width: 3rem;
            height: 3rem;
            margin-right: 0.5rem;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

    & > .left, .right {
        display: flex;
        justify-content: center;
    } 

    & > .right > svg {
        cursor: pointer;
    }

    .info > .title{
        font-weight: 800;
        font-size: 1rem;
    }
    
    .info > .artist{ 
        font-weight: 400;
        font-size: 0.8rem;
    }
`;

export default SearchResultItem;