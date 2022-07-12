import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
import Content from "../UI/Content";

interface GuestRouteProps {
    RouteComponent: React.ComponentType;
}

function Alert() {
    const { t } = useTranslation<"guestRoute">("guestRoute");
    useEffect(() => {
        //
    }, [t]);
    return <Content>{t("ment")}</Content>;
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