import { css } from "@emotion/react";
import React from "react";

interface ImgProps {
    imgSrc?: string;
}

function Img(props: ImgProps) {
    return (
        <figure css={style}>
            <img src={props.imgSrc} alt="" />
        </figure >
    );
}

const style = css`
    img {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
`;

export default Img;