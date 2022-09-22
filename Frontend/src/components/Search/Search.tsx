import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchForm from "./SearchForm";
import { useQuery } from "react-query";
import getList from "utils/RequestApis/EvaluationSearch/getList";
import Result from "./ResultList";
import { css } from "@emotion/react";
import _ from "lodash";
import SearchMusicType from "./SearchMusicType";


function Search() {
    const [keyword, setKeyword] = useState<string>("");
    const [result, setResult] = useState<SearchMusicType[]>([]);
    const [resultShwon, setResultShown] = useState<boolean>(false);

    const { refetch } = useQuery(["autoKeyWord", keyword], () => getList({ keyword }), {
        suspense: false,
        useErrorBoundary: false,
        enabled: false,
        onSuccess: (res) => {
            setResult(res);
        },
    });



    const debounceOnChange = useMemo(() => _.debounce(() => {
        refetch();
    }, 500), []);

    const onChangeKeyWord = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) setResultShown(true);
        else if (e.target.value.length === 0) setResultShown(false);
        setKeyword(() => e.target.value);
        debounceOnChange();
    }, []);

    const onCloseResultHandler = useCallback(() => {
        setResultShown(false);
        setKeyword("");
        setResult([]);
    }, []);

    useEffect(() => {
        const event = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onCloseResultHandler();
            }
        };
        addEventListener("keydown", event);
        return () => {
            removeEventListener("keydown", event);
        };
    }, [onCloseResultHandler]);

    return (
        <article css={style}>
            <SearchForm
                keyword={keyword}
                onChange={onChangeKeyWord}
            />
            {resultShwon &&
                <Result
                    result={result}
                    onClose={onCloseResultHandler}
                />
            }

        </article>

    );
}
const style = css`
    position: relative;
    margin-top: -1.5rem;
    margin-bottom: 1.5rem;

`;

export default Search;