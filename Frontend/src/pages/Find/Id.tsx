import React, { useCallback, useEffect, useState } from "react";
import Input from "components/common/Input";
import Submit from "components/common/Submit";
import { useTranslation } from "react-i18next";
import useAxios from "hooks/use-Axios";
import { Skeleton } from "@mui/material";
import FindContentBox from "./FindContent";


function Id() {
    const { t } = useTranslation("findPage");
    const [email, setEmail] = useState<string>("");
    const { fetchData, status } = useAxios({
        url: "/findid",
        method: "POST",
        body: {
            email
        }
    });
    useEffect(() => {
        //
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    }, [fetchData]);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const init = !status.isError && !status.isLoading && !status.isSucess;

    if (init) {
        return (
            <form onSubmit={onSubmit}>
                <Input
                    type="email"
                    w={"25rem"}
                    h={"2.5rem"}
                    input={{
                        id: "email",
                        placeholder: t("id.placeholder"),
                        type: "email",
                        value: email,
                        onChange: onChangeHandler
                    }}
                />
                <Submit
                    w={"5rem"}
                    h={"2.5rem"}
                    value={t("id.submit")}
                    disabled={!email}
                />
            </form>
        );
    }

    if (status.isLoading) {
        return (
            <FindContentBox>
                <Skeleton variant="text" sx={{ bgcolor: "grey.500" }} width={430} height={30} />
            </FindContentBox>
        );
    }

    return (
        <FindContentBox>
            {status.isError && <p>{t("id.error")}</p>}
            {status.isSucess && <p>{t("id.sucess")}</p>}
        </FindContentBox>
    );
}
export default Id;