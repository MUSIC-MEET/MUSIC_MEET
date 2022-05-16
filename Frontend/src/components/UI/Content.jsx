
import React, { useContext } from "react";
import styled from "styled-components";
import ThemeContext from "../../store/ThemeContext";

const ContentBlock = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${ props => props.background };
    color: ${ props => props.fontColor};
`;

function Content(props) {
    const ctx = useContext(ThemeContext);
    const { background, fontColor } = ctx.themeStyle.content;
    return (
        <ContentBlock  background={background} fontColor={fontColor}>
            {props.children}
        </ContentBlock>
    );
}

export default Content;