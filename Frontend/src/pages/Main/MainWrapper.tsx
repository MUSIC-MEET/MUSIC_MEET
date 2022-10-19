import { css } from "@emotion/react";
import React from "react";

interface MainWrapperProps {
    className?: string;
    subMenu?: React.ReactNode;
    children?: React.ReactNode;
    title: string;
}

function MainWrapper(props: MainWrapperProps) {
    return (
        <section className={`${props.className} main-wrapper`} css={style}>
            <div className="top">
                <h3>{props.title}</h3>
                {props.subMenu}
            </div>
            <hr style={{ "color": "white" }} />
            {props.children}
        </section>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    h3 {
        font-size: 1.5rem;
        font-weight: 800;
    }
    hr {
        width: 100%;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

`;

export default MainWrapper;