import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import ThemeContext from "../../store/ThemeContext";
import SearchIcon from "@mui/icons-material/Search";
const style = css`
    margin-top: 1rem;
    margin-bottom: 1rem;
    & > input {
        width: 100%;
        height: 100%;
        border: 1px solid gray;
        border-radius: 5px;
        font-size: 0.8rem;
        padding-left: 2.2rem;
        padding-right: 1rem;
    }

    & > .search-icon {
        font-size: 1.5rem;
        margin-left: 0.5rem;
        transform: translateY(-140%);
    }

    & input:focus {
        outline: none;
    }
`;

function Search() {
    const { t } = useTranslation("menu");
    const ctx = useContext(ThemeContext);
    const { fontColor, searchBackground } = ctx.themeStyle.menu;
    return (
        <form css={style}>
            <input 
                css={css`color: ${fontColor}; background: ${searchBackground};`}
                type="search" placeholder={t("search.placeholder")} 
            />
            <SearchIcon className="search-icon"/>
        </form>
    );
}

export default Search;