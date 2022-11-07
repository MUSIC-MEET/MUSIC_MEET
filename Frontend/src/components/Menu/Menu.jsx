import React, { useContext, useState, useCallback } from "react";
import { css } from "@emotion/react";   
import ThemeContext from "../../store/ThemeContext";
import Login from "components/Login/Login";
import Search from "components/Search/Search";
import RoutesMenu from "components/RoutesMenu/RoutesMenu";
import { useNavigate } from "react-router-dom";
import TopIcons from "./TopIcons";
import Logo from "../common/Logo";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";

function Menu(props) {
    const ctx = useContext(ThemeContext);
    const { background, fontColor } = ctx.themeStyle.menu;
    const { onMenuClose } = props;  
    const navigator = useNavigate();
    const [ mobileMenuShown, setMobileMenuShown ] = useState(false);
    const isDesktop = useMediaQuery({
        query: "(min-width: 1024px)"
    });


    const onClickMobileMenuHandler = useCallback(() => {
        setMobileMenuShown((prev) => !prev);
    },[setMobileMenuShown]);

    if(isDesktop) {
        return (
            <aside 
                className={`${props.className}`}
                css={[navStyle, deskTopStyle, css` background: ${background}; color: ${fontColor};`]}
            >
                <TopIcons className={"icons"} onMenuClose={onMenuClose}/>
                <Logo className={"logo"}/>
                <Login className={"login"} navigator={navigator}/>
                <Search className={"search"} />
                <RoutesMenu className={"menu"}/>
            </aside>
        );
    }
    //  mobile 
    else {
        return (
            <aside 
                css={[navStyle, mobileStyle,  css` background: ${background}; color: ${fontColor};`]}
            >
                <div className="top">
                    <div className="top-inner">
                        <Logo className={"logo"}/>
                        <Search className={"search"} />
                    </div>
                    
                    <MenuIcon className={"more"} onClick={onClickMobileMenuHandler}/>
                </div>
                {mobileMenuShown && 
                    <div className="bottom">
                        <RoutesMenu />
                        <Login className={"login"} navigator={navigator}/>
                        {/* <TopIcons className={"icons"} onMenuClose={onMenuClose}/> */}
                    </div>
                }
                {/* { !isDesktop && <MenuIcon className={"more"} />}
                
                <RoutesMenu className={"menu"}/> */}
            </aside>
        );
    }
}

const navStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 
    height: 100%;
    
    .logo {
        width: 10rem; // 160px  
        height: 3rem; // 48px
        margin-right: 1rem;
    }

`;

const deskTopStyle = css`
    min-width: 14rem;

    & > * {
        width: 11rem;
        min-height: auto;
    }
`;

const mobileStyle = css`
/* Mobile */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 4rem;
    border-bottom: 1px solid gray;

    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        width: 100vw;

        .top-inner {
            display: flex;
            flex-direction: row;
        }

        .more {
            cursor: pointer;
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;
export default React.memo(Menu);