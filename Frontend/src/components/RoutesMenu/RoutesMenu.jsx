import React from "react";
import RouteItem from "../common/RouteItem";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function RoutesMenu() {
    const { t } = useTranslation("menu");
    const navigater = useNavigate();
    const ROUTES = [
        { name : t("routes.menu1"), link: "/tmp" },
        { name : t("routes.menu2"), link: "/tmp" },
        { name : t("routes.menu3"), link: "/tmp" },
        { name : t("routes.menu4"), link: "/tmp" },
    ];
    return (
        <ul>
            {ROUTES.map((route,index) =>(
                <RouteItem 
                    name={route.name} 
                    link={route.link} 
                    key={index}
                    navigater={navigater}
                />
            ))}
        </ul>
    );
}

export default RoutesMenu;