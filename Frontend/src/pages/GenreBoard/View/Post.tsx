import { css } from "@emotion/react";
import React from "react";

function Post() {
    return (
        <article css={postStyle}>
            <h1 className="post-num">제목</h1>
        </article>
    );
}

const postStyle = css`
    & > .post-num {
        font-size: 2,5rem;
        font-weight: 400;
        
    }
`;

export default React.memo(Post);