import React, { useMemo, useCallback, useEffect } from "react";
import RouteItem from "../common/RouteItem";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CurrentPage from "../../store/CurrentPage";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";

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
        { name : t("routes.menu2"), link: "/board/kpop" },
        { name : t("routes.menu3"), link: "/music/list" },
        { name : t("routes.menu4"), link: "/cover/list" },
    ],[t]);

    return ( 
        <nav>
            <ul css={style} >
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

const style = css`
    display: flex;
    flex-direction: column;
`;

export default React.memo(RoutesMenu);