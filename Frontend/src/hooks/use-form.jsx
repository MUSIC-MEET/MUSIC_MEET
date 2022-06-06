import { useCallback, useState } from "react";

function useForm(props) {
    const { initValues, validator } = props;
    const [values, setValues] = useState(initValues);
    const { error } = validator(values);
    const valuesChangeHandler = useCallback((e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name] : value
        });
        validator(values);
    },[validator, values]);
    return {
        values,
        valuesChangeHandler,
        error
    };
}

export default useForm;