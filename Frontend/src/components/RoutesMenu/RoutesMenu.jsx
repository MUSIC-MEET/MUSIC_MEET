import React from "react";
import RouteMenuItem from "../common/RouteItem";
import { useTranslation } from "react-i18next";

function RoutesMenu() {
    const { t } = useTranslation("menu");
    
    const ROUTES = [
        { name : t("routes.menu1"), link: "/tmp" },
        { name : t("routes.menu2"), link: "/tmp" },
        { name : t("routes.menu3"), link: "/tmp" },
        { name : t("routes.menu4"), link: "/tmp" },
    ];
    return (
        <ul>
            {ROUTES.map((route,index) =>(
                <RouteMenuItem 
                    name={route.name} 
                    link={route.link} 
                    key={index}
                />
            ))}
        </ul>
    );
}

export default RoutesMenu;