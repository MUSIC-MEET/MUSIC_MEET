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
                <div className="sub">{props.subMenu}</div>
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
    position: relative;
    h3 {
        font-size: 1.5rem;
        font-weight: 800;
    }
    hr {
        width: 100%;
    }

    .top {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        h3 {    
            margin-right: 1rem;
        }

        .sub {
            flex: 1;
        }
    }

`;

export default MainWrapper;