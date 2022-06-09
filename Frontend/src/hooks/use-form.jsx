import { useCallback, useEffect, useState } from "react";

function useForm(props) {
    const { initValues, validator } = props;
    const [ values, setValues] = useState(initValues);
    const [ errors, setErrors] = useState({
        ...initValues,
        clear: false
    });

    useEffect(() => {

    },[validator]);

    const valuesChangeHandler = useCallback(async (e) => {
        const { name, value } = e.target;
        const newData = {
            ...values,
            [name] : value
        };
        setValues(newData);
        await validator({ name: name, values: newData, errors: { errors, setErrors } });
    },[errors, validator, values]);

    
    return {
        values,
        valuesChangeHandler,
        error: errors
    };
}

export default useForm;