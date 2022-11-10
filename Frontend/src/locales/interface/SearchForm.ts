interface SearchForm {
    input: {
        placeholder: string;
        submit: string;
    }
    select: {
        options: {
            title: string;
            nickname: string;
        }
    }
}

export default SearchForm;