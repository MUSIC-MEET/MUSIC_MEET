import { css } from "@emotion/react";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import ThemeContext from "store/ThemeContext";

function LoginMenu() {
    const { nickname } = useRecoilValue(LoginState);
    const ctx = useContext(ThemeContext);
    return (
        <section>
            <span css={css`cursor: pointer; color: ${ctx.themeStyle.menu.login.fontColor}`}>{nickname}</span>
        </section>
    );
}

export default React.memo(LoginMenu);