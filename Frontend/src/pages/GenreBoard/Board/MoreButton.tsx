import React, { useCallback, useContext, useRef } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";

import ThemeContext from "store/ThemeContext";
import styled from "@emotion/styled";
function MoreButton() {
    const ctx = useContext(ThemeContext);
    const hiddenBoxRef = useRef<HTMLDivElement>(null);
    const buttonClickHandler = useCallback(() => {
        if (hiddenBoxRef?.current?.classList.contains("open")) {
            hiddenBoxRef?.current?.classList.remove("open");
            hiddenBoxRef?.current?.classList.add("close");
        } else {
            hiddenBoxRef?.current?.classList.remove("close");
            hiddenBoxRef?.current?.classList.add("open");
        }

    }, []);
    return (
        <Button theme={ctx.theme}>
            <div className="hidden-box" ref={hiddenBoxRef}>
                <CreateIcon className="btn" />
                <SearchIcon className="btn" />
            </div>

            <MoreHorizIcon className="btn" onClick={buttonClickHandler} />
        </Button>
    );
}
const Button = styled.button`
    all:unset;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    position: fixed;
    right: 5vw;
    bottom: 15vh;
    overflow: visible;

    .btn {
        padding: 0.5rem;
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        border: 1px solid gray;
        background-color: ${props => props.theme === "dark" ? "#181818" : "#fff"};
        color: ${props => props.theme === "dark" ? "#fff" : "#000"};
        border-radius: 100%;
        box-shadow: 0px 0px 5px 2px #696868;
        margin-bottom: 1rem;
    }   

    .hidden-box { 
        display: none;
        height: 0;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        
        
    }

    .open {
        animation: open 0.5s;
        animation-fill-mode: forwards;
    }
    @keyframes open {
        from {
            height: 0;
        }
        to {
            height: 8rem;
            overflow: visible
        }
    }

    .close {
        animation: close 0.6s;
        animation-fill-mode: forwards;
    }

    @keyframes close {
        from {
            height: 8rem;
            overflow: visible
        }
        to {
            height: 0rem;
        }
    }
`;

export default MoreButton;