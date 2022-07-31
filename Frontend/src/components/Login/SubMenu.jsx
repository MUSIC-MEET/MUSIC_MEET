import React, { useCallback, useMemo } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import  LoginModalShown  from "store/LoginModalShown";
import { useTranslation } from "react-i18next";

function SubMenu() {
    const { t } = useTranslation("loginForm");
    const navigate = useNavigate();
    const setLoginModalShown = useSetRecoilState(LoginModalShown);
    const onClickHandler = useCallback((path) => {
        navigate(path);
        setLoginModalShown(false);
    },[navigate, setLoginModalShown]);

    const signup = useMemo(() => t("signup"), [t]);
    const findId = useMemo(() => t("findId"), [t]);
    const findPw = useMemo(() => t("findPw"), [t]);

    return (
        <div css={subMenuStyle}>
            <div>
                <span onClick={() => onClickHandler("/signup")}>{signup}</span>
            </div>
                
            <div>
                <span onClick={() => onClickHandler("/find/id")}>{findId}</span>
                <span
                    onClick={() => onClickHandler("/find/pw")}
                    className={"pw"}>
                    {findPw}
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