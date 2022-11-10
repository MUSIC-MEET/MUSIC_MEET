import { css } from "@emotion/react";
import Input from "components/common/Input";
import Select from "components/common/Select";
import Submit from "components/common/Submit";
import React from "react";
import { useTranslation } from "react-i18next";

interface PostSearchFormProps {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onChangeType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    keyword: string;
}

function PostSearchForm(props: PostSearchFormProps) {
    const { t } = useTranslation<"searchForm">("searchForm");
    return (
        <form css={style} onSubmit={props.onSubmit}>
            <Select
                onChange={props.onChangeType}
            >
                <option selected={props.type === "title"} value="title">{t("select.options.title")}</option>
                <option selected={props.type === "user"} value="user">{t("select.options.nickname")}</option>
            </Select>
            <Input
                input={{
                    type: "search",
                    placeholder: t("input.placeholder"),
                    onChange: props.onChangeKeyword,
                }}
            />
            <Submit
                value={t("input.submit")}
            />
        </form>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    height: auto;
    input[type="search"] {
        padding: 1rem;
        width: 30%;
        height: 3rem;
        margin: 0 0.5rem;
    }

    input[type="search"], select, input[type="submit"] {
        height: 3rem;
    }

    input[type="submit"] {
        width: 5rem;
    }
`;

export default PostSearchForm;