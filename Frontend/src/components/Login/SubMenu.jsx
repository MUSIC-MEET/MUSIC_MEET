import React from "react";
import { css } from "@emotion/react";
function SubMenu(props) {
    const { onClickSignUp, textSignUp, textFindId, textFindPw } = props;
    return (
        <div css={subMenuStyle}>
            <div>
                <span onClick={onClickSignUp}>{textSignUp}</span>
            </div>
                
            <div>
                <span>{textFindId}</span>
                <span className={"pw"}>{textFindPw}</span>
            </div>
        </div>
    );
}

const subMenuStyle = css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    div > .pw::before {
        content: " · ";
    }

    span {
        cursor: pointer;
    }

    color: #888888;
    font-size: 0.8rem;
`;

export default React.memo(SubMenu);