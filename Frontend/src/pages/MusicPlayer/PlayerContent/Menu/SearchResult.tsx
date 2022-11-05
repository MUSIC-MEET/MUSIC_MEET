import React from "react";
import PlayListSearchItem from "Types/PlayListSearchItem";
import BaseProps from "components/common/BaseProps";
import SearchResultItem from "./SearchResultItem";
import { css } from "@emotion/react";

interface SearchResultProps {
    result: PlayListSearchItem[];
    addMusic: (id: number) => void;
}

function SearchResult(props: SearchResultProps & BaseProps) {
    return (
        <ul
            css={style}
            className={`${props?.className}`}
        >
            {
                props.result.map((item, index) => (
                    <SearchResultItem
                        className="item"
                        key={index}
                        {...item}
                        onAdd={props.addMusic}
                    />
                ))
            }
        </ul>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 95%;
    height: 100%;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding-bottom: 1rem;
    padding-top: 1rem;
    & > .item {
        margin-bottom: 1rem;
    }

    & > .item:nth-last-child(1){
        margin-bottom: 0;
    }
`;

export default SearchResult;