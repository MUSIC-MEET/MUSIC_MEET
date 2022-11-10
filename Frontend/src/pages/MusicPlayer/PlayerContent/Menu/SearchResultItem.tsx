import React, { useState, useContext } from "react";
import PlayListSearchItem from "Types/PlayListSearchItem";
import BaseProps from "components/common/BaseProps";

import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import ThemeContext from "store/ThemeContext";

interface SearchResultItemProps {
    onAdd: (id: number) => void;
}

function SearchResultItem(props: BaseProps & PlayListSearchItem & SearchResultItemProps) {
    const ctx = useContext(ThemeContext);
    const [addIsHover, setAddIsHover] = useState<boolean>(false);
    return (
        <Item
            addIsHover={addIsHover}
            hoverColor={ctx.themeStyle.fontStyle2.color}
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
                <AddIcon
                    onMouseEnter={() => setAddIsHover(true)}
                    onMouseLeave={() => setAddIsHover(false)}
                    onClick={() => props.onAdd(props.id ?? -1)}
                />
            </div>
        </Item>
    );
}

const Item = React.memo(styled.li<{
    addIsHover: boolean;
    hoverColor: string;
}>`
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
        transform: scale(1.3);
        color: ${(props) => (props.addIsHover ? "inherit" : props.hoverColor)};
    }

    .info > .title{
        font-weight: 800;
        font-size: 1rem;
    }
    
    .info > .artist{ 
        font-weight: 400;
        font-size: 0.8rem;
    }
`);

export default SearchResultItem;