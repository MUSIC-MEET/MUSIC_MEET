import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import Content from "../UI/Content";

interface GuestRouteProps {
    RouteComponent: React.ComponentType;
}

function Alert() {
    return <Content>로그인 상태에서 이용하실수 없습니다.</Content>;
}

function GuestRoute(props: GuestRouteProps) {
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const { RouteComponent } = props;
    useEffect(() => {
        //
    }, [isLogIn]);

    if (!isLogIn) {
        return <RouteComponent />;
    }

    return <Alert />;
}

export default GuestRoute;