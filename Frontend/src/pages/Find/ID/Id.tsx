import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "hooks/use-Axios";
import { Skeleton } from "@mui/material";
import Title from "components/common/Title";
import FindIdForm from "./FindIdForm";

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

    const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    }, [fetchData]);

    const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const init = !status.isError && !status.isLoading && !status.isSucess;

    return (
        <React.Fragment>
            <Title>{t(`id.title`)}</Title>
            <p>{t("ment")}</p>
            {init &&
                <FindIdForm
                    onSubmit={submitHandler}
                    onChange={changeHandler}
                    placeholder={t("id.placeholder")}
                    submitText={t("id.submit")}
                    email={email}
                />
            }
            {status.isLoading &&
                <Skeleton variant="text" sx={{ bgcolor: "grey.500" }} width={430} height={30} />
            }
            {status.isError && <p>{t("id.error")}</p>}
            {status.isSucess && <p>{t("id.sucess")}</p>}
        </React.Fragment>
    );
}
export default Id;