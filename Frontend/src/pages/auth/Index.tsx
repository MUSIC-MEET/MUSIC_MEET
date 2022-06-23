import useAxios from "hooks/use-Axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Suceess() {
    return (
        <div>{"ㅁㅁ"}</div>
    );
}

function Fail() {
    return (
        <div>{"fail"}</div>
    );
}

function Index() {
    const { value } = useParams<{ value: string }>();
    const [result, setResult] = useState<boolean>(false);
    const { fetchData } = useAxios({
        method: "GET",
        url: `/auth/${value}`,
    });
    useEffect(() => {
        fetchData()
            .then(() => {
                setResult(true);
            })
            .catch(() => {
                setResult(false);
            });
    }, [fetchData]);

    if (result) {
        return Suceess();
    } else {
        return fail();
    }
}

export default Index;