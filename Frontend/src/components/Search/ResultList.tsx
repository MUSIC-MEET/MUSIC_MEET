import { css } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import Music from "./Music";
import SearchMusicType from "components/Search/SearchMusicType";
import ThemeContext from "store/ThemeContext";
import ReactDOM from "react-dom";

const portalElement: any = document.getElementById("overlay");


const BackDrop = (props: { onClose: () => void }) => {
    return (
        <div className="backdrop" css={backdropStyle} onClick={props.onClose}></div>
    );
};


function ResultList({ result, onClose }: { result: SearchMusicType[]; onClose: () => void; }) {
    const ctx = useContext(ThemeContext);
    const { fontColor, searchBackground } = ctx.themeStyle.menu;

    useEffect(() => {
        //
    }, [result]);

    return (
        <section css={[style, css`color: ${fontColor}; background:${searchBackground};`]}>

            <ul style={{ zIndex: "10000" }}>
                {result.map((music) => (
                    <Music
                        key={music.musicNum}
                        imgSrc={music.imgSrc}
                        musicNum={music.musicNum}
                        title={music.title}
                        singer={music.singer}
                        onClose={onClose}
                    />
                ))}
            </ul>
            {/* {
                ReactDOM.createPortal(<BackDrop onClose={onClose} />, portalElement)
            } */}
        </section>
    );
}

const style = css`
    position: absolute;
    border: 1px solid gray;

    width: 200%;
    max-height: 32rem;
    overflow-y: scroll;
    max-height: 15rem;
    border-radius: 5px;
    padding: 1rem;
    margin-top: 1rem;

    background-color: red;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
    z-index: 3000;

    & > li {
        margin-bottom: 1rem;
    }

    & > li:last-child {
        margin-bottom: 0;
    }
    
`;

const backdropStyle = css`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 99;
    background-color: white;
    background: rgba(255, 255, 255, 0);
`;

export default ResultList;