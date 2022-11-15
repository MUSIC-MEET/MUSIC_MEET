import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import BaseProps from "components/common/BaseProps";
import styled from "@emotion/styled";

interface SearchFormProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


function SearchForm(props: BaseProps & SearchFormProps) {
    return (
        <Form className={`${props?.className}`} onSubmit={(e) => e.preventDefault()}>
            <input
                type="search"
                value={props.value}
                onChange={props.onChange}
            />
            <SearchIcon />
        </Form >
    );
}

const Form = React.memo(styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    & > input {
        width: 100%;
        padding: 1rem;
        padding-right: 3.5rem;
        border-radius: 5px;
        border: none;
        background: none;
    }

    & > svg {
        transform: translateX(-50%);
    }

`);

export default SearchForm;