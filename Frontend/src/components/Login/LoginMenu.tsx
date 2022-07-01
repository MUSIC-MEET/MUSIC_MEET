import { css } from "@emotion/react";
import React, { useCallback, useContext } from "react";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import ThemeContext from "store/ThemeContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function LoginMenu() {
    const { nickname } = useRecoilValue(LoginState);
    const ctx = useContext(ThemeContext);
    const navigate = useNavigate();
    const onLogoutHandler = useCallback(() => {
        navigate("/user/logout");
    }, [navigate]);
    return (
        <section css={style}>
            <span css={css`color: ${ctx.themeStyle.menu.login.fontColor}`}>{nickname}</span>
            <LogoutIcon
                onClick={onLogoutHandler}
                css={css`color: ${ctx.themeStyle.menu.login.fontColor}`}
            />
        </section>
    );
}
const style = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > span {
        margin-right: 0.4rem;
        cursor: pointer;
    }

    & > svg {
        cursor: pointer;
        font-size: 1.2rem;
    }
`;

export default LoginMenu;