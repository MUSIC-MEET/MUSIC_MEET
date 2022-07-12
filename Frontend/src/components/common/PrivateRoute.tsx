import Content from "components/UI/Content";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginModalShownState from "store/LoginModalShown";
import LoginState from "store/LoginState";

interface PrivateRoutProps {
    RouteComponent: React.ComponentType;
}

function Login() {
    const setShown = useSetRecoilState(LoginModalShownState);
    useEffect(() => {
        setShown(true);
    }, []);
    return <Content>로그인 필요</Content>;
}

function PrivateRoute(props: PrivateRoutProps) {
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const { RouteComponent } = props;
    useEffect(() => {
        //
    }, [isLogIn]);
    if (isLogIn) {
        return <RouteComponent />;
    }
    else {
        return <Login />;
    }
}

export default PrivateRoute;