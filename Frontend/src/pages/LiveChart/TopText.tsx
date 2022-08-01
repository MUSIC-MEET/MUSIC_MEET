import styled from "@emotion/styled";
import React, { useContext, useEffect } from "react";
import Title from "components/common/Title";
import ThemeContext from "../../store/ThemeContext";

function TopText() {
    const ctx = useContext(ThemeContext);
    const subTitleFontColor = ctx.themeStyle.secondFont.fontColor;


    return (
        <Section>
            <Title>{"음악차트"}</Title>
            <SubTitle
                color={subTitleFontColor}
            >
                {"여러 사이트의 음악 순위를 한눈에 확인해보세요!"}
            </SubTitle>
            <UpdateTimeText
                color={subTitleFontColor}
            >
                {"최신 업데이트 : 2020.01.01"}
            </UpdateTimeText>
        </Section>
    );
}


const Section = React.memo(styled.section`
    & > h1 { margin-bottom: 0.8rem };
    & > * {
        margin-bottom: 0.8rem;
    }
`);

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

export default React.memo(TopText);