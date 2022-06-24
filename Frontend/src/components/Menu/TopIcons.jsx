import { css } from "@emotion/react";
import React, { useCallback, useContext, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import  NightsStayIcon  from "@mui/icons-material/NightsStay";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ThemeContext from "store/ThemeContext";
import { useTranslation } from "react-i18next";
import { ReactComponent as TransIcon } from "./kr.svg";
function TopIcons(props) {
    const ctx = useContext(ThemeContext);
    const { t, i18n } = useTranslation("setting");
    const { theme, setDarkTheme, setLightTheme, themeStyle } = ctx;
    const onChangeLanguage = useCallback(() => {
        if(t("mode") === "kr") {
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("kr");
        }
    },[i18n, t]);

    const [boxShown, setBoxShown] = useState(false);
    const onChangeFirstBoxState = useCallback(() => {
        setBoxShown((prevState) => !prevState);
    },[]);
    return (
        <section css={style}>
            <MoreVertIcon 
                onClick={onChangeFirstBoxState}
            />
            {
                boxShown &&
                <Box ctx={ctx}>
                    {
                        theme === "dark" ?
                            <Brightness4Icon onClick={setLightTheme} />:
                            <NightsStayIcon onClick={setDarkTheme} />
                    } 
                    <TransIcon 
                        fill={themeStyle.menu.fontColor}
                        onClick={() => onChangeLanguage()}
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />

                </Box>
            }
            
            <CloseIcon  onClick={props.onMenuClose} />
        </section>
    );
}

const Box = (props) => {
    const { borderColor, background } = props.ctx.themeStyle.menu.subMenu;
    return (
        <div css={[boxStyle, css`border: 1px solid ${borderColor}; background: ${background};`]}>
            {props.children}
        </div>
    );
};

const style = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    & > * {
        cursor: pointer;
    }
`;

const boxStyle = css`
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-left: 1.5rem;
    padding: 0.5rem;
    width: auto;
    border-radius: 3px;

    * {
        margin-bottom: 0.5rem;
    }
`;


export default TopIcons;