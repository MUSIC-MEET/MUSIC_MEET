import { css } from "@emotion/react";

const style = css`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    overflow: scroll;
    & > .title {
        width: 100%;
        text-align:center;
    }
`;
export default style;