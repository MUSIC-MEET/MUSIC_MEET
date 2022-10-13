import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import ThemeContext from "store/ThemeContext";

interface SectionWrapperProps {
    children: React.ReactNode;
    style?: any;
    className?: string
}

function SectionWrapper(props: SectionWrapperProps) {
    const ctx = useContext(ThemeContext);
    const { backgroundColor } = ctx.themeStyle.sectionWrapper;
    return (
        <Section
            className={`${props.className} section-wrapper`}
            backgroundColor={backgroundColor}
            css={[props.style]}
        >
            {props.children}
        </Section>
    );
}

const Section = styled.section<{ backgroundColor: string; }>`
    background: ${(props) => props.backgroundColor};
    width: 99%;
    margin-bottom: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
`;
export default SectionWrapper;