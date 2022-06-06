import axios from "axios";
import { useCallback, useState } from "react";



function useAxios({ method, url, body, header }) {
    const [isLodding, setIsLodding] = useState(false);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = useCallback(() => {
        setIsLodding(true);
        axios({
            method: method,
            url: url,
            data: body || null,
            headers: header || {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            setIsError(true);
            setError(err);
        });
        setIsLodding(false);
    },[body, header, method, url]);


    

    return { 
        isError,
        isLodding,
        data,
        error,
        fetchData
    };
}

export default useAxios;