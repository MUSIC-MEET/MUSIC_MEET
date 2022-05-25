/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Title from "components/common/Title";
import Content from "components/UI/Content";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "store/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const te = css`
    background: red;
    width:100px;
    height: 100px;
    
`;
function Index(props) {
    const { t, i18n } = useTranslation("setting");
    const ctx = useContext(ThemeContext);
    const { theme, setDarkTheme, setLightTheme } = ctx;
    const onChangeLanguage = useCallback((e) => {
        i18n.changeLanguage(e.target.value);
    },[i18n]);
    return (
        <Content props={props.className}>
            <Title>{t("title")}</Title>
            <div css={te}>
                ddd
            </div>
            <div css={styles}>
                <section>
                    <p>ㅇㅇㅇㅇ</p>
                    {
                        theme === "dark" ?
                            <Brightness4Icon onClick={setLightTheme} />:
                            <NightsStayIcon onClick={setDarkTheme} />
                    }   
                </section> 

                <section>
                    <p>dd</p>
                    <select onChange={onChangeLanguage}>
                        <option value="kr">{t("lang.kr")}</option>
                        <option value="en">{t("lang.en")}</option>
                    </select>
                </section>
            </div>
            
        </Content>
    );
}

const styles = css`
    background: red;
`;
export default Index;