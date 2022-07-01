import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import LoginState from "store/LoginState";

function Logout() {
    const navigate = useNavigate();
    const resetLoginState = useResetRecoilState(LoginState);
    useEffect(() => {
        window.localStorage.clear();
        resetLoginState();
        navigate("/");
    }, [navigate, resetLoginState]);
    return (
        <React.Fragment>

        </React.Fragment>
    );
}

export default Logout;