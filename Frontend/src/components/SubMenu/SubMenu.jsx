import RouteItem from "components/common/RouteItem";
import React from "react";
import { useTranslation } from "react-i18next";

function SubMenu() {
    const { t } = useTranslation("menu");
    const ROUTES = [
        { name : t("subRoutes.menu1"), link: "/setting" },
    ];
    return (
        <ul>
            {
                ROUTES.map((route, index) => ( 
                    <RouteItem  
                        key={index}
                        name={route.name}
                        link={route.link}
                    />
                ))
            }
        </ul>
    );
}

export default SubMenu;