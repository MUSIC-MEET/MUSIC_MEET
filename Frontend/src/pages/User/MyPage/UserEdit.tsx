import React from "react";
import { css } from "@emotion/react";
import ValuesEdit from "./ValuesEdit";


function UserEdit() {

    return (
        <article css={[articleStyle]}>
            <section>
                이미지
            </section>
            <section>
                <ValuesEdit />
            </section>

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