import React, { useState, useCallback } from "react";
import RouteItem from "../common/RouteItem";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function RoutesMenu() {
    const { t } = useTranslation("menu");
    const navigater = useNavigate();
    const [currentRoute, setCurrentRoute] = useState(0);
    const routeClickHandler = useCallback((index) => {
        setCurrentRoute(index);
    },[]);
    const ROUTES = [
        { name : t("routes.menu0"), link: "/" },
        { name : t("routes.menu1"), link: "/tmp" },
        { name : t("routes.menu2"), link: "/tmp" },
        { name : t("routes.menu3"), link: "/tmp" },
        { name : t("routes.menu4"), link: "/tmp" },
    ];
    return (
        <nav>
            <ul>
                {ROUTES.map((route,index) =>(
                    <RouteItem 
                        clicked={currentRoute === index}
                        name={route.name} 
                        link={route.link} 
                        key={index}
                        navigater={navigater}
                        currentIndex={index}
                        onClickRoute={routeClickHandler}
                    />
                ))}
            </ul>
        </nav>
    );
}

export default RoutesMenu;