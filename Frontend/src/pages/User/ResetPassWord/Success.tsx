import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import LoginState from "store/LoginState";

interface SuccessProps {
    success: string;
    ment: string;
    callBack?: () => void;
}

function Success(props: SuccessProps) {
    const reset = useResetRecoilState(LoginState);

    useEffect(() => {
        reset();
        sessionStorage.removeItem("token");
    }, [reset]);
    return (
        <React.Fragment>
            <p>{props.success}</p>
            <a onClick={props.callBack} css={css`margin-top: 1rem; cursor: pointer; text-decoration: underline`}>
                {props.ment}
            </a>
        </React.Fragment>
    );
}

export default Success;