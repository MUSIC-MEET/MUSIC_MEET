import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import  LoginModalShown  from "store/LoginModalShown";
function SubMenu(props) {
    const { onClickSignUp, textSignUp, textFindId, textFindPw } = props;
    const navigate = useNavigate();
    const setLoginModalShown = useSetRecoilState(LoginModalShown);
    const onClickHandler = useCallback((type) => {
        navigate(`/find/${type}`);
        setLoginModalShown(false);
    },[navigate, setLoginModalShown]);
    return (
        <div css={subMenuStyle}>
            <div>
                <span onClick={onClickSignUp}>{textSignUp}</span>
            </div>
                
            <div>
                <span onClick={() => onClickHandler("id")}>{textFindId}</span>
                <span
                    onClick={() => onClickHandler("pw")}
                    className={"pw"}>
                    {textFindPw}
                </span>
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