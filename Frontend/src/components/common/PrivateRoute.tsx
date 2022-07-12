import React from "react";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

interface PrivateRoutProps {
    RouteComponent: React.ComponentType;
}

function PrivateRoute(props: PrivateRoutProps) {
    const { isLogIn } = useRecoilValue<{ isLogIn: boolean }>(LoginState);
    const { RouteComponent } = props;
    if (isLogIn) {
        return <RouteComponent />;
    }
    else {
        return <div>로그인필요</div>;
    }
}

export default PrivateRoute;