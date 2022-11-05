import React, { useCallback, useEffect, useMemo, useState, useContext } from "react";
import BaseProps from "components/common/BaseProps";
import SearchForm from "./SearchForm";

import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import search from "utils/RequestApis/MusicPlayer/search";
import _, { add } from "lodash";

import PlayListSearchItem from "Types/PlayListSearchItem";
import SearchResult from "./SearchResult";
import styled from "@emotion/styled";
import ThemeContext from "store/ThemeContext";
import addMusic from "utils/RequestApis/MusicPlayer/addMusic";


function Search(props: BaseProps) {
    const ctx = useContext(ThemeContext);
    const queryClient = useQueryClient();
    const { fontColor, subFontColor, background } = ctx.themeStyle.musicPlayer.content.search;
    const [keyword, setKeyword] = useState<string>("");
    const [result, setResult] = useState<PlayListSearchItem[]>([]);
    const [resultShown, setResultShown] = useState<boolean>(false);
    const { refetch } = useQuery(["PlayListMusicSearch", keyword], () => search(keyword), {
        suspense: false,
        useErrorBoundary: false,
        enabled: false,
        onSuccess: (data) => {
            setResult(data);
        },
        onError: (error) => {
            setResult([]);
        }
    });

    const { mutate } = useMutation(["PlayListMusicAdd"], addMusic, {
        useErrorBoundary: false,
        onSuccess: () => {
            queryClient.invalidateQueries(["fetchMusicPlayList"]);
        }
    });

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


    const addMusicHandler = useCallback((id: number) => {
        mutate(id);
    }, [mutate]);

    const debounceOnChange = useMemo(() => _.debounce(() => {
        refetch();
    }, 500), []);

    const keywordChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(() => e.target.value);
        if (e.target.value.length === 0) {
            setResultShown(false);
            return;
        }
        setResultShown(true);
        debounceOnChange();
    }, []);


    console.log(fontColor);
    return (
        <Div
            fontColor={fontColor}
            subFontColor={subFontColor}
            background={background}
            className={`${props?.className}`}
        >
            <SearchForm
                value={keyword}
                onChange={keywordChangeHandler}
            />
            {
                resultShown &&
                <SearchResult
                    className="search-result"
                    result={result}
                    addMusic={addMusicHandler}
                />
            }
        </Div>
    );
}

const Div = React.memo(styled.div<{
    fontColor: string;
    subFontColor: string;
    background: string;
}>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;
    z-index: 1;
    border: 1px solid gray;
    background-color: ${props => props.background};
    p, input, svg {
        color: ${props => props.fontColor};
    }

    .sub {
        color: ${props => props.fontColor};
    }

    & > .search-result {
        border-top: 1px solid ${props => props.fontColor}; 
    }
    .sub {
        color: ${props => props.subFontColor};
    }
`);

export default Search;