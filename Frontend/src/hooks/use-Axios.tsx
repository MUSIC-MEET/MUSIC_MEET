import axios from "axios";
import { useState, useCallback } from "react";
import { statusType, InitStatus } from "utils/RequestStatus";

interface useHooksProps {
    method: "POST" | "GET" | "PUT" | "DELETE",
    url: string,
    body?: {
        //
    } | null,
    header?: {
        //
    } | null
}

function useAxios(props: useHooksProps) {

    const { method, url, body, header } = props;
    const [status, setStatus] = useState<statusType>(InitStatus);

    const fetchData = useCallback(() => {
        return new Promise((resolve, reject) => {
            setStatus({ isSucess: false, isError: false, isLoading: true });
            axios({
                method: method,
                url: url,
                data: body || null,
                headers: header || {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                setStatus({ ...status, isSucess: true, isError: false });
                resolve(res.data);
            }).catch((err) => {

                setStatus({ ...status, isError: true, isSucess: false });
                reject(err.response.data);
            });
        });
    }, [body, header, method, status, url]);



    return {
        status,
        fetchData
    };
}

export default useAxios;