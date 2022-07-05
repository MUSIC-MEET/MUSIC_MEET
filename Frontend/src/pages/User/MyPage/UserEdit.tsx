import React from "react";
import { css } from "@emotion/react";
import ValuesEdit from "./ValuesEdit";
import ImageEdit from "./ImageEdit";


function UserEdit() {

    return (
        <article css={[articleStyle]}>
            <ImageEdit />
            <ValuesEdit />
        </article>
    );
}

const articleStyle = css`
    width: 70vw;
    min-height: 20vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    section {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export default UserEdit;