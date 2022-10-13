import styled from "@emotion/styled";
import React, { useContext } from "react";
import ThemeContext from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import LiveChartUpdateTime from "store/LiveChartListUpdateTime";

function SubText() {
    const ctx = useContext(ThemeContext);
    const subTitleFontColor = ctx.themeStyle.secondFont.fontColor;
    const { t } = useTranslation<"liveChartPage">("liveChartPage");
    const updateTime = useRecoilValue(LiveChartUpdateTime);
    return (
        <React.Fragment>
            <SubTitle
                color={subTitleFontColor}
            >
                {t("subTitle")}
            </SubTitle>
            <UpdateTimeText
                color={subTitleFontColor}
            >
                {`${t("updateTime")} : ${updateTime}`}
            </UpdateTimeText>
        </React.Fragment>
    );
}

const SubTitle = React.memo(styled.p`
    font-weight: 700;
    font-size: 1.2rem;
    color: ${props => props.color};

`);

const UpdateTimeText = React.memo(styled.p`
    font-weight: 300;
    font-size: 0.8rem;
    color: ${props => props.color};
`);

export default React.memo(SubText);