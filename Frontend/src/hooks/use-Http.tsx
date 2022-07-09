import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";
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

function useHttp(props: useHooksProps) {

    const { method, url, body, header } = props;
    const [status, setStatus] = useState<statusType>(InitStatus);
    const { key, isLogIn } = useRecoilValue(LoginState);

    useEffect(() => {
        //
    }, [body, url, isLogIn, key]);

    const fetchData = useCallback(() => {
        return new Promise((resolve, reject) => {
            setStatus({ isSucess: false, isError: false, isLoading: true });
            axios({
                method: method,
                url: url,
                data: body || null,
                headers: header || {
                    "Content-Type": "application/json",
                    "authorization": isLogIn ? key : ""
                }
            }).then((res) => {
                setStatus({ ...status, isSucess: true, isError: false });
                resolve(res.data);
            }).catch((err) => {

                setStatus({ ...status, isError: true, isSucess: false });
                reject(err.response.data);
            });
        });
    }, [body, header, isLogIn, key, method, status, url]);



    return {
        status,
        fetchData
    };
}

export default useHttp;