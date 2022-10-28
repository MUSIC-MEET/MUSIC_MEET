import { css } from "@emotion/react";
import React from "react";
import MusicProgressbar from "./MusicProgressbar";
import RightController from "./RightController";



function PlayerController() {
    return (
        <section css={style}>
            <MusicProgressbar />
            <div className="button-controller">
                <div className="item">1</div>
                <div className="item">2</div>
                <RightController />
            </div>

        </section>
    );
}

const style = css`
    width: 100%;
    height: 5rem;
    background: red;
    display: flex;
    flex-direction: column;

    .button-controller {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        margin-top: 0.5rem;
    }

`;

export default PlayerController;