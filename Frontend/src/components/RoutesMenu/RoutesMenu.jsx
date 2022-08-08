import React, { useMemo, useCallback, useEffect } from "react";
import RouteItem from "../common/RouteItem";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CurrentPage from "../../store/CurrentPage";
import { useRecoilState } from "recoil";

function RoutesMenu() {
    const { t } = useTranslation("menu");
    const navigater = useNavigate();
    const [ currentPage, setCurrentPage ] = useRecoilState(CurrentPage);
    const routeClickHandler = useCallback((index) => {
        setCurrentPage(index);
    },[setCurrentPage]);

    useEffect(() => {
        //
    },[]);

    const ROUTES = useMemo(() => [
        { name : t("routes.menu0"), link: "/" },
        { name : t("routes.menu1"), link: "/livechart" },
        { name : t("routes.menu2"), link: "/board" },
        { name : t("routes.menu3"), link: "/tmp" },
        { name : t("routes.menu4"), link: "/tmp" },
    ],[t]);

    return ( 
        <nav>
            <ul>
                {ROUTES.map((route,index) =>(
                    <RouteItem 
                        clicked={currentPage === index}
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

export default React.memo(RoutesMenu);