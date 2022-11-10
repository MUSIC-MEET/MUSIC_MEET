import React, { useCallback, useState } from "react";
import Title from "components/common/Title";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PostSearchForm from "components/common/PostSearchForm";

function Search() {
    const { t } = useTranslation<"coverSearchPage">("coverSearchPage");
    const params = useParams<{ type: string; keyword: string }>();
    const [type, setType] = useState<string>(params.type ?? "title");
    const [keyword, setKeyword] = useState<string>(params.keyword ?? "");

    const typeChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(() => e.target.value);
    }, []);

    const keywordChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(() => e.target.value);
    }, []);

    return (
        <React.Fragment>
            <Title>{t("title")}</Title>
            <PostSearchForm
                type={type}
                keyword={keyword}
                onChangeType={typeChangeHandler}
                onChangeKeyword={keywordChangeHandler}
            />
        </React.Fragment>
    );
}

export default Search;