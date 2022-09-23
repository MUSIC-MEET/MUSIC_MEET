import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import ThemeContext from "../../store/ThemeContext";
import SearchIcon from "@mui/icons-material/Search";

function SearchForm({ keyword, onChange, onSubmit }) {
    const { t } = useTranslation("menu");
    const ctx = useContext(ThemeContext);
    const { fontColor, searchBackground } = ctx.themeStyle.menu;

    return (
        <form css={style} onSubmit={onSubmit}>
            <SearchIcon className="search-icon" />
            <input
                css={css`color: ${fontColor}; background: ${searchBackground};`}
                type="search" placeholder={t("search.placeholder")}
                value={keyword}
                onChange={onChange}
            />
            
        </form>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    & > input {
        width: 100%;
        height: 3rem;
        border: 1px solid gray;
        border-radius: 5px;
        font-size: 0.8rem;
        padding-left: 2.2rem;
        padding-right: 1rem;
    }
    
    & > .search-icon {
        font-size: 1.5rem;
        margin-left: 0.5rem;
        transform: translateY(140%);
    }

    & input:focus {
        outline: none;
    }
`;


export default SearchForm;