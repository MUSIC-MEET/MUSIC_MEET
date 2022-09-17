import Input from "components/common/Input";
import Form from "components/common/Form";
import React, { useContext } from "react";
import { css } from "@emotion/react";
import ThemeContext from "store/ThemeContext";
import styled from "@emotion/styled";
import Submit from "components/common/Submit";

interface SearchBarProps {
    keyword: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}



function SearchBar(props: SearchBarProps) {
    const { keyword, onChange, onSubmit } = props;
    const ctx = useContext(ThemeContext);
    const { fontColor } = ctx.themeStyle.content;
    const { borderColor } = ctx.themeStyle.input;
    return (
        <Form
            direction="row"
            onSubmit={onSubmit}
            addCss={[formStyle]}

        >
            <Select
                fontColor={fontColor}
                borderColor={borderColor}
            >
                <option value="title">제목</option>
                <option value="user">user</option>
            </Select>
            <Input
                input={{
                    value: keyword,
                    onChange: onChange,
                    type: "search"
                }}
            />
            <Submit
                value="검색"
            />

        </Form>
    );
}

const formStyle = css`
    width: 100%;
    margin-top: 2.5rem;
    justify-content: center;
    align-items: center;


    & > select, input {
        height: 3rem;
    }
    & > select {
        width: 4rem;
        margin-right: 0.5rem;
        background: none;
    }
    & > input[type="search"] {
        width: 30%;
    }
    & > input[type="submit"] {
        width: 3.5rem;
        margin-left: 0.5rem;
    }
`;

const Select = styled.select<{ fontColor: string; borderColor: string }>`
    padding: 0.5rem;
    color: ${props => props.fontColor};
    border-color: ${props => props.borderColor};
`;

export default React.memo(SearchBar);