import axios from "axios";
import {  useState, useCallback } from "react";



function useAxios(props) {
    
    const { method, url, body, header } = props;
    const [isLodding, setIsLodding] = useState(false);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: body || null,
            headers: header || {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setData(res.data);
            resolve(res.data);
        }).catch((err) => {
            setIsError(true);
            setError(err.response.data);
            reject(err.response.data);
        });
        setIsLodding(false);
    }),[body, header, method, url]);
    
    return { 
        isError,
        isLodding,
        data,
        errors: error,
        fetchData
    };
}

export default useAxios;