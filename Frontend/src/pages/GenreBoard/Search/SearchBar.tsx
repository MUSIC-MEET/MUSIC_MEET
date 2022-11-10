import Input from "components/common/Input";
import Form from "components/common/Form";
import React, { useContext } from "react";
import { css } from "@emotion/react";
import ThemeContext from "store/ThemeContext";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
import Select from "components/common/Select";

interface SearchBarProps {
    keyword: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    type: string;
    typeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}



function SearchBar(props: SearchBarProps) {
    const { keyword, onChange, onSubmit, type, typeChange } = props;
    const ctx = useContext(ThemeContext);
    const { fontColor } = ctx.themeStyle.content;
    const { borderColor } = ctx.themeStyle.input;
    const { t } = useTranslation<"genreBoardSearchPage">("genreBoardSearchPage");
    return (
        <Form
            direction="row"
            onSubmit={onSubmit}
            addCss={[formStyle]}

        >
            <Select
                onChange={typeChange}
            >
                <option selected={type === "title"} value="title">{t("searchBar.options.title")}</option>
                <option selected={type === "user"} value="user">{t("searchBar.options.nickname")}</option>
            </Select>
            <Input
                input={{
                    value: keyword,
                    onChange: onChange,
                    type: "search",
                    placeholder: t("searchBar.placeholder")
                }}
            />
            <Submit
                value={t("searchBar.submit")}
            />

        </Form >
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
        width: 6rem;
        margin-right: 0.5rem;
        background: none;
        text-align: center;
    }
    & > input[type="search"] {
        width: 30%;
    }
    & > input[type="submit"] {
        width: 3.5rem;
        margin-left: 0.5rem;
    }
`;


export default React.memo(SearchBar);